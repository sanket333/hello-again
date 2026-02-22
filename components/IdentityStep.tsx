
import React from 'react';

interface IdentityStepProps {
  firstName: string;
  lastName: string;
  dob: string;
  onUpdate: (first: string, last: string, dob: string) => void;
  onNext: () => void;
}

const IdentityStep: React.FC<IdentityStepProps> = ({ firstName, lastName, dob, onUpdate, onNext }) => {
  const isInvalid = !firstName.trim() || !lastName.trim() || !dob.trim();

  return (
    <div className="flex flex-col flex-1 px-6 pb-24 h-full">
      <div className="mb-8 mt-4 text-center">
        <h1 className="text-[32px] sm:text-4xl font-extrabold leading-tight tracking-tight text-stone-dark dark:text-white mb-2">
          Let's introduce you.
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed px-2">
          Use your real name so your old friends can recognize you.
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full flex-1">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 pl-1">
            First Name
          </label>
          <input
            autoFocus
            className="w-full h-14 px-5 rounded-xl border border-input-border dark:border-input-border-dark bg-white dark:bg-surface-dark text-lg font-medium text-stone-dark dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            value={firstName}
            onChange={(e) => onUpdate(e.target.value, lastName, dob)}
            placeholder="Jane"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 pl-1">
            Last Name
          </label>
          <input
            className="w-full h-14 px-5 rounded-xl border border-input-border dark:border-input-border-dark bg-white dark:bg-surface-dark text-lg font-medium text-stone-dark dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            value={lastName}
            onChange={(e) => onUpdate(firstName, e.target.value, dob)}
            placeholder="Doe"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 pl-1">
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full h-14 px-5 rounded-xl border border-input-border dark:border-input-border-dark bg-white dark:bg-surface-dark text-lg font-medium text-stone-dark dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            value={dob}
            onChange={(e) => onUpdate(firstName, lastName, e.target.value)}
          />
        </div>
      </div>

      <div className="fixed sm:absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent pt-12 z-10">
        <button
          disabled={isInvalid}
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

export default IdentityStep;
