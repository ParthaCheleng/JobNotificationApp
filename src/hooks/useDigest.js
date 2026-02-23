import { useState, useCallback } from 'react';
import { jobs } from '../data/jobs';
import { usePreferences } from './usePreferences';
import { calculateMatchScore } from '../utils/matchEngine';

const getTodayKey = () => {
    const today = new Date();
    // YYYY-MM-DD format based on local time
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `jobTrackerDigest_${year}-${month}-${day}`;
};

export function useDigest() {
    const { preferences, hasPreferences } = usePreferences();

    // Load existing digest if it exists for today
    const [digestKey] = useState(getTodayKey());
    const [todaysDigest, setTodaysDigest] = useState(() => {
        try {
            const existing = window.localStorage.getItem(digestKey);
            return existing ? JSON.parse(existing) : null;
        } catch (error) {
            console.error("Failed to read digest", error);
            return null;
        }
    });

    const generateDigest = useCallback(() => {
        if (!hasPreferences) {
            return { error: 'NO_PREFERENCES' };
        }

        // 1. Calculate scores for all jobs based on current preferences
        const scoredJobs = jobs.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, preferences)
        }));

        // 2. Filter out complete duds (optional, but requested: logic mentions top 10 matched jobs based on rules)
        // If there are literally 0 matches, that's fine.
        let validMatches = scoredJobs.filter(job => job.matchScore >= (preferences.minMatchScore || 0));

        // 3. Sort: matchScore descending, then postedDaysAgo ascending
        validMatches.sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
                return b.matchScore - a.matchScore;
            }
            return a.postedDaysAgo - b.postedDaysAgo;
        });

        // 4. Take top 10
        const top10 = validMatches.slice(0, 10);

        // 5. Store in localStorage and update state
        try {
            window.localStorage.setItem(digestKey, JSON.stringify(top10));
            setTodaysDigest(top10);
            return { success: true, count: top10.length };
        } catch (error) {
            console.error('Failed to save digest', error);
            return { error: 'SAVE_FAILED' };
        }
    }, [digestKey, preferences, hasPreferences]);

    return {
        todaysDigest,
        generateDigest,
        hasPreferences,
        digestKey
    };
}
