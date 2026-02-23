import { useState, useEffect } from 'react';

export function useSavedJobs() {
    const [savedJobIds, setSavedJobIds] = useState(() => {
        try {
            const item = window.localStorage.getItem('savedJobIds');
            return item ? JSON.parse(item) : [];
        } catch (error) {
            console.error("Failed to read from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem('savedJobIds', JSON.stringify(savedJobIds));
        } catch (error) {
            console.error("Failed to write to localStorage", error);
        }
    }, [savedJobIds]);

    const toggleSaveJob = (jobId) => {
        setSavedJobIds((prevIds) => {
            if (prevIds.includes(jobId)) {
                return prevIds.filter(id => id !== jobId);
            } else {
                return [...prevIds, jobId];
            }
        });
    };

    const isJobSaved = (jobId) => {
        return savedJobIds.includes(jobId);
    };

    return { savedJobIds, toggleSaveJob, isJobSaved };
}
