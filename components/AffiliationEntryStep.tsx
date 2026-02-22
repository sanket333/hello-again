
import React, { useState } from 'react';
import { Affiliation, AffiliationType } from '../types';
import PlacesAutocomplete from './PlacesAutocomplete';

interface AffiliationEntryStepProps {
  onAdd: (affiliation: Affiliation) => void;
  onBack: () => void;
}

const AffiliationEntryStep: React.FC<AffiliationEntryStepProps> = ({ onAdd }) => {
  const [type, setType] = useState<AffiliationType | ''>('');
  const [name, setName] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [isCurrent, setIsCurrent] = useState(false);

  const isValid = type && name && startYear && (endYear || isCurrent);

  const handleSubmit = () => {
    if (isValid) {
      onAdd({
        id: Math.random().toString(36).substr(2, 9),
        type: type as AffiliationType,
        name,
        startYear,
        endYear: isCurrent ? 'Present' : endYear,
        isCurrent,
      });
    }
  };

  return (
    <div className="flex flex-col flex-1 px-6 pb-24">
      <div className="pt-2 mb-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-stone-dark dark:text-white mb-2">
          Where did your story begin?
        </h1>
        <p className="text-base font-normal leading-relaxed text-gray-500 dark:text-gray-400">
          Let's find the people you crossed paths with. Start by adding your first meaningful place.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-stone-dark dark:text-white">What kind of place was it?</label>
          <div className="relative">
            <select
              className="w-full appearance-none rounded-xl border border-stone-light dark:border-stone-700 bg-stone-100 dark:bg-surface-dark p-4 pr-10 text-base font-medium text-stone-dark dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              value={type}
              onChange={(e) => setType(e.target.value as AffiliationType)}
            >
              <option disabled value="">Select an affiliation type</option>
              <option value={AffiliationType.SCHOOL}>High School</option>
              <option value={AffiliationType.UNIVERSITY}>University / College</option>
              <option value={AffiliationType.WORK}>Workplace</option>
              <option value={AffiliationType.ORGANIZATION}>Organization</option>
              <option value={AffiliationType.OTHER}>Other Community</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-stone-dark dark:text-white">What was it called?</label>
          <PlacesAutocomplete
            value={name}
            onChange={setName}
            placeholder="e.g. Lincoln High School"
            types={
              type === AffiliationType.SCHOOL || type === AffiliationType.UNIVERSITY
                ? ['university', 'school']
                : ['establishment']
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-stone-dark dark:text-white">When were you there?</label>
          <div className="flex gap-3">
            <input
              className="flex-1 rounded-xl border border-stone-light dark:border-stone-700 bg-stone-100 dark:bg-surface-dark p-4 text-base font-medium text-stone-dark dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              placeholder="Start Year"
              type="text"
            />
            <input
              disabled={isCurrent}
              className="flex-1 rounded-xl border border-stone-light dark:border-stone-700 bg-stone-100 dark:bg-surface-dark p-4 text-base font-medium text-stone-dark dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors disabled:opacity-50"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              placeholder="End Year"
              type="text"
            />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <input
              id="isCurrent"
              type="checkbox"
              checked={isCurrent}
              onChange={(e) => setIsCurrent(e.target.checked)}
              className="h-5 w-5 rounded border-stone-light text-primary focus:ring-primary dark:bg-surface-dark dark:border-stone-700"
            />
            <label htmlFor="isCurrent" className="text-sm font-medium text-gray-500 select-none">I am currently here</label>
          </div>
        </div>
      </div>

      <div className="fixed sm:absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent pt-12 z-10">
        <button
          disabled={!isValid}
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 px-6 text-white text-lg font-bold shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          Next
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default AffiliationEntryStep;
