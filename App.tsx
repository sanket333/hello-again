
import React, { useState, useCallback } from 'react';
import { UserProfile, OnboardingStep, Gender, Affiliation } from './types';
import IdentityStep from './components/IdentityStep';
import GenderStep from './components/GenderStep';
import PersonalTouchStep from './components/PersonalTouchStep';
import AffiliationEntryStep from './components/AffiliationEntryStep';
import JourneyStep from './components/JourneyStep';
import SuccessStep from './components/SuccessStep';
import StepIndicator from './components/StepIndicator';

const App: React.FC = () => {
  const [step, setStep] = useState<OnboardingStep>(OnboardingStep.IDENTITY);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    gender: null,
    bio: '',
    interests: ['Hiking', 'Vinyl Records', 'Coffee'],
    avatar: 'https://picsum.photos/seed/user123/400/400',
    affiliations: [],
  });

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

  const renderStep = () => {
    switch (step) {
      case OnboardingStep.IDENTITY:
        return (
          <IdentityStep
            firstName={profile.firstName}
            lastName={profile.lastName}
            onUpdate={(fn, ln) => updateProfile({ firstName: fn, lastName: ln })}
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
            onFinish={nextStep}
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
        <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default App;
