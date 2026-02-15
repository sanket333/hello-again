
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface PersonalTouchStepProps {
  bio: string;
  interests: string[];
  avatar: string;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PersonalTouchStep: React.FC<PersonalTouchStepProps> = ({ bio, interests, avatar, onUpdate, onNext }) => {
  const [newInterest, setNewInterest] = useState('');

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      onUpdate({ interests: [...interests, newInterest.trim()] });
      setNewInterest('');
    }
  };

  const removeInterest = (tag: string) => {
    onUpdate({ interests: interests.filter((i) => i !== tag) });
  };

  const handleAvatarChange = () => {
    const newAvatar = `https://picsum.photos/seed/${Math.random()}/400/400`;
    onUpdate({ avatar: newAvatar });
  };

  return (
    <div className="flex flex-col flex-1 px-6 pb-24">
      <div className="flex flex-col items-center pt-2 pb-6 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-stone-dark dark:text-white mb-2">
          Add a Personal Touch
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed max-w-[280px]">
          Help your old friends recognize the new you.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative group cursor-pointer" onClick={handleAvatarChange}>
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-surface-dark shadow-lg bg-gray-100 dark:bg-gray-800 relative">
            <img src={avatar} alt="User Avatar" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="material-symbols-outlined text-white">edit</span>
            </div>
          </div>
          <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary-dark transition-colors border-2 border-white dark:border-background-dark flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <label className="text-stone-dark dark:text-gray-200 text-sm font-semibold ml-1">
            Your Bio <span className="font-normal text-gray-500/70 dark:text-gray-400">(Optional)</span>
          </label>
          <div className="relative">
            <textarea
              className="w-full bg-stone-100 dark:bg-surface-dark border-0 rounded-xl p-4 text-base text-stone-dark dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50 min-h-[120px] resize-none shadow-sm"
              value={bio}
              onChange={(e) => onUpdate({ bio: e.target.value })}
              placeholder="Currently living in Chicago, love hiking and vintage vinyl..."
              maxLength={150}
            ></textarea>
            <span className="absolute bottom-3 right-4 text-xs text-gray-500 font-medium">
              {bio.length}/150
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-stone-dark dark:text-gray-200 text-sm font-semibold ml-1">
            Interests & Hobbies <span className="font-normal text-gray-500/70 dark:text-gray-400">(Optional)</span>
          </label>
          <div className="relative flex items-center">
            <input
              className="w-full bg-stone-100 dark:bg-surface-dark border-0 rounded-xl py-3.5 pl-4 pr-12 text-base text-stone-dark dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50 shadow-sm"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addInterest()}
              placeholder="e.g. Photography, 90s Music"
            />
            <button
              onClick={addInterest}
              className="absolute right-2 p-1.5 bg-white dark:bg-background-dark rounded-lg text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {interests.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-1 pl-3 pr-2 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20 rounded-full text-sm font-medium transition-transform hover:scale-105"
              >
                <span>{tag}</span>
                <span
                  className="material-symbols-outlined text-[16px] opacity-60 hover:opacity-100 cursor-pointer"
                  onClick={() => removeInterest(tag)}
                >
                  close
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed sm:absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent pt-12 z-10">
        <button
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 px-6 text-white text-lg font-bold shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark active:scale-[0.98] group"
        >
          Next
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default PersonalTouchStep;
