
import React from 'react';
import { OnboardingStep } from '../types';

interface StepIndicatorProps {
  currentStep: OnboardingStep;
  totalSteps: number;
  onBack: () => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, onBack }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-20 flex items-center p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md">
      <button
        onClick={onBack}
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-stone-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        <span className="material-symbols-outlined text-2xl">arrow_back</span>
      </button>
      <div className="flex-1 ml-4 mr-2">
        <div className="relative w-full h-1.5 bg-stone-light dark:bg-stone-700/50 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
