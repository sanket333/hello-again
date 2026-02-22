import React, { useEffect, useRef } from 'react';

// Extend the Window interface to include the google maps API
declare global {
    interface Window {
        google?: typeof google;
    }
}

interface PlacesAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    types?: string[];
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
    value,
    onChange,
    placeholder = 'Search...',
    types = ['establishment'],
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    useEffect(() => {
        if (!inputRef.current) return;

        // If the API hasn't loaded yet, fall back to plain text
        if (!window.google?.maps?.places) return;

        autocompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            { types }
        );

        const listener = autocompleteRef.current.addListener('place_changed', () => {
            const place = autocompleteRef.current?.getPlace();
            if (place?.name) {
                onChange(place.name);
            }
        });

        return () => {
            window.google?.maps.event.removeListener(listener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined">search</span>
            </div>
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete="off"
                className="w-full rounded-xl border border-stone-light dark:border-stone-700 bg-stone-100 dark:bg-surface-dark p-4 pl-12 text-base font-medium text-stone-dark dark:text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
        </div>
    );
};

export default PlacesAutocomplete;
