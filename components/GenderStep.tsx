
import React from 'react';
import { Gender } from '../types';

interface GenderStepProps {
  selected: Gender | null;
  onSelect: (gender: Gender) => void;
  onNext: () => void;
  onBack: () => void;
}

const GenderStep: React.FC<GenderStepProps> = ({ selected, onSelect, onNext }) => {
  const options = [
    { value: Gender.MALE, label: 'Male' },
    { value: Gender.FEMALE, label: 'Female' },
    { value: Gender.OTHER, label: 'Other' },
    { value: Gender.NOSAY, label: 'Prefer not to say' },
  ];

  return (
    <div className="flex flex-col flex-1 px-6 pb-24">
      <div className="flex flex-col gap-2 mb-8 text-center sm:text-left mt-4">
        <h1 className="text-stone-dark dark:text-white text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.15]">
          How do you <br /> <span className="text-primary">identify?</span>
        </h1>
        <p className="text-stone-dark/70 dark:text-white/70 text-base font-medium leading-relaxed mt-2">
          This helps us personalize your experience to find better matches for you.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {options.map((opt) => (
          <label key={opt.value} className="group relative cursor-pointer select-none">
            <input
              type="radio"
              className="sr-only"
              checked={selected === opt.value}
              onChange={() => onSelect(opt.value)}
            />
            <div
              className={`flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 shadow-sm ${
                selected === opt.value
                  ? 'border-primary bg-primary/5'
                  : 'border-stone-light dark:border-stone-700 bg-white dark:bg-white/5 hover:border-primary/50'
              }`}
            >
              <div className="flex grow flex-col">
                <p className="text-stone-dark dark:text-white text-lg font-bold">{opt.label}</p>
              </div>
              <div
                className={`relative size-6 rounded-full border-2 transition-colors flex items-center justify-center ${
                  selected === opt.value ? 'border-primary' : 'border-stone-light dark:border-stone-500'
                }`}
              >
                <div
                  className={`size-3 rounded-full bg-primary transition-transform duration-200 ${
                    selected === opt.value ? 'scale-100' : 'scale-0'
                  }`}
                ></div>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="fixed sm:absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent pt-12 z-10">
        <button
          disabled={!selected}
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 px-6 text-white text-lg font-bold shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          Next
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default GenderStep;
