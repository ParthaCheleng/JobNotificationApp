import { useState, useEffect } from 'react';

const DEFAULT_PREFERENCES = {
    roleKeywords: '',
    preferredLocations: [],
    preferredMode: [],
    experienceLevel: '',
    skills: '',
    minMatchScore: 40
};

export function usePreferences() {
    const [preferences, setPreferences] = useState(() => {
        try {
            const item = window.localStorage.getItem('jobTrackerPreferences');
            return item ? JSON.parse(item) : DEFAULT_PREFERENCES;
        } catch (error) {
            console.error('Failed to read preferences from localStorage:', error);
            return DEFAULT_PREFERENCES;
        }
    });

    const [hasPreferences, setHasPreferences] = useState(false);

    useEffect(() => {
        try {
            window.localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences));

            // Determine if they actually have preferences set (beyond default score)
            const hasRealPrefs =
                preferences.roleKeywords.trim() !== '' ||
                preferences.preferredLocations.length > 0 ||
                preferences.preferredMode.length > 0 ||
                preferences.experienceLevel !== '' ||
                preferences.skills.trim() !== '';

            setHasPreferences(hasRealPrefs);
        } catch (error) {
            console.error('Failed to write preferences to localStorage:', error);
        }
    }, [preferences]);

    const updatePreferences = (newPrefs) => {
        setPreferences(prev => ({
            ...prev,
            ...newPrefs
        }));
    };

    return { preferences, updatePreferences, hasPreferences };
}
