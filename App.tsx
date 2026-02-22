
import React, { useState, useCallback, useEffect } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile, OnboardingStep, Gender, Affiliation } from './types';
import { useAuth } from './context/AuthContext';
import { db } from './lib/firebase';
import LoginScreen from './components/LoginScreen';
import IdentityStep from './components/IdentityStep';
import GenderStep from './components/GenderStep';
import PersonalTouchStep from './components/PersonalTouchStep';
import AffiliationEntryStep from './components/AffiliationEntryStep';
import JourneyStep from './components/JourneyStep';
import SuccessStep from './components/SuccessStep';
import StepIndicator from './components/StepIndicator';

const App: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [step, setStep] = useState<OnboardingStep>(OnboardingStep.IDENTITY);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    gender: null,
    bio: '',
    interests: ['Hiking', 'Vinyl Records', 'Coffee'],
    avatar: 'https://picsum.photos/seed/user123/400/400',
    dob: '',
    affiliations: [],
  });

  // Pre-fill profile from authenticated user data
  useEffect(() => {
    if (user) {
      const names = user.displayName?.split(' ') || ['', ''];
      const firstName = names[0] || '';
      const lastName = names.slice(1).join(' ') || '';

      setProfile((prev) => ({
        ...prev,
        firstName: prev.firstName || firstName,
        lastName: prev.lastName || lastName,
        avatar: prev.avatar === 'https://picsum.photos/seed/user123/400/400' ? (user.photoURL || prev.avatar) : prev.avatar,
      }));
    }
  }, [user]);

  const nextStep = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, OnboardingStep.SUCCESS));
  }, []);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, OnboardingStep.IDENTITY));
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const addAffiliation = useCallback((affiliation: Affiliation) => {
    setProfile((prev) => ({
      ...prev,
      affiliations: [...prev.affiliations, affiliation],
    }));
  }, []);

  const removeAffiliation = useCallback((id: string) => {
    setProfile((prev) => ({
      ...prev,
      affiliations: prev.affiliations.filter((a) => a.id !== id),
    }));
  }, []);

  const handleFinish = useCallback(async () => {
    if (user) {
      try {
        // Save profile directly to the user's document for easier access and visibility
        await setDoc(doc(db, 'users', user.uid), {
          ...profile,
          updatedAt: serverTimestamp(),
        }, { merge: true });
        console.log('Profile saved successfully to users/', user.uid);
      } catch (err) {
        console.error('Failed to save profile to Firestore:', err);
      }
    }
    nextStep();
  }, [user, profile, nextStep]);

  // Firebase resolving auth state
  if (loading) {
    return (
      <div className="flex justify-center min-h-screen bg-stone-100 dark:bg-zinc-900">
        <div className="relative flex flex-col items-center justify-center w-full max-w-md bg-background-light dark:bg-background-dark shadow-2xl min-h-screen sm:min-h-0 sm:h-[844px] sm:my-8 sm:rounded-2xl gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-white text-3xl">favorite</span>
          </div>
          <p className="text-gray-400 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Not signed in — show login
  if (!user) {
    return <LoginScreen />;
  }

  const renderStep = () => {
    switch (step) {
      case OnboardingStep.IDENTITY:
        return (
          <IdentityStep
            firstName={profile.firstName}
            lastName={profile.lastName}
            dob={profile.dob}
            onUpdate={(fn, ln, dob) => updateProfile({ firstName: fn, lastName: ln, dob })}
            onNext={nextStep}
          />
        );
      case OnboardingStep.GENDER:
        return (
          <GenderStep
            selected={profile.gender}
            onSelect={(g) => updateProfile({ gender: g })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case OnboardingStep.PERSONAL:
        return (
          <PersonalTouchStep
            bio={profile.bio}
            interests={profile.interests}
            avatar={profile.avatar}
            onUpdate={(updates) => updateProfile(updates)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case OnboardingStep.AFFILIATION_ENTRY:
        return (
          <AffiliationEntryStep
            onAdd={(a) => {
              addAffiliation(a);
              setStep(OnboardingStep.JOURNEY);
            }}
            onBack={prevStep}
          />
        );
      case OnboardingStep.JOURNEY:
        return (
          <JourneyStep
            affiliations={profile.affiliations}
            onAddAnother={() => setStep(OnboardingStep.AFFILIATION_ENTRY)}
            onRemove={removeAffiliation}
            onFinish={handleFinish}
            onBack={prevStep}
          />
        );
      case OnboardingStep.SUCCESS:
        return <SuccessStep profile={profile} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-stone-100 dark:bg-zinc-900 transition-colors duration-300">
      <div className="relative flex flex-col w-full max-w-md bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden min-h-screen sm:min-h-0 sm:h-[844px] sm:my-8 sm:rounded-2xl">
        {step !== OnboardingStep.SUCCESS && (
          <StepIndicator currentStep={step} totalSteps={Object.keys(OnboardingStep).length / 2 - 1} onBack={prevStep} />
        )}
        {/* Sign out button (subtle, top-right) */}
        {step === OnboardingStep.IDENTITY && (
          <button
            onClick={signOut}
            className="absolute top-3 right-4 z-20 text-xs text-gray-400 hover:text-primary transition-colors font-medium"
          >
            Sign out
          </button>
        )}
        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default App;
