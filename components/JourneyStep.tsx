
import React from 'react';
import { Affiliation } from '../types';

interface JourneyStepProps {
  affiliations: Affiliation[];
  onAddAnother: () => void;
  onRemove: (id: string) => void;
  onFinish: () => void;
  onBack: () => void;
}

const JourneyStep: React.FC<JourneyStepProps> = ({ affiliations, onAddAnother, onRemove, onFinish }) => {
  return (
    <div className="flex flex-col flex-1 px-6 pb-24">
      <div className="pt-2 mb-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-stone-dark dark:text-white mb-2">
          Your Journey
        </h1>
        <p className="text-base font-normal leading-relaxed text-gray-500 dark:text-gray-400">
          Here are the places you've added. You can add more or continue to find friends.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {affiliations.map((aff) => (
          <div
            key={aff.id}
            className="group relative flex items-start gap-4 p-4 rounded-xl border border-stone-light dark:border-stone-700 bg-white dark:bg-surface-dark transition-all hover:border-primary/50 shadow-sm"
          >
            <div className="h-12 w-12 rounded-full bg-stone-100 dark:bg-zinc-800 flex items-center justify-center text-primary shadow-sm shrink-0">
              <span className="material-symbols-outlined filled">school</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-stone-dark dark:text-white truncate">{aff.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{aff.type}</p>
              <div className="flex items-center gap-2 mt-1 text-xs font-medium text-gray-500">
                <span className="bg-stone-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-stone-light dark:border-stone-700">
                  {aff.startYear} - {aff.endYear}
                </span>
              </div>
            </div>
            <button
              onClick={() => onRemove(aff.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-2"
            >
              <span className="material-symbols-outlined text-xl">delete</span>
            </button>
          </div>
        ))}

        <button
          onClick={onAddAnother}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-4 px-6 text-base font-bold text-primary border-2 border-dashed border-stone-light dark:border-stone-700 hover:border-primary hover:bg-primary/5 transition-all duration-200"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Add another Affiliation
        </button>
      </div>

      <div className="fixed sm:absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent pt-12 z-10">
        <button
          onClick={onFinish}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 px-6 text-white text-lg font-bold shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark active:scale-[0.98] group"
        >
          Finish
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">check_circle</span>
        </button>
      </div>
    </div>
  );
};

export default JourneyStep;
