import { useState, useCallback } from 'react';

export function useJobStatus() {
    const [jobStatuses, setJobStatuses] = useState(() => {
        try {
            const existing = window.localStorage.getItem('jobTrackerStatus');
            return existing ? JSON.parse(existing) : {};
        } catch (error) {
            console.error('Failed to parse jobTrackerStatus:', error);
            return {};
        }
    });

    const updateJobStatus = useCallback((jobId, newStatus) => {
        setJobStatuses((prev) => {
            const updated = {
                ...prev,
                [jobId]: {
                    status: newStatus,
                    updatedAt: new Date().toISOString()
                }
            };

            try {
                window.localStorage.setItem('jobTrackerStatus', JSON.stringify(updated));
            } catch (error) {
                console.error('Failed to save jobTrackerStatus:', error);
            }
            return updated;
        });
    }, []);

    const getJobStatus = useCallback((jobId) => {
        return jobStatuses[jobId]?.status || 'Not Applied';
    }, [jobStatuses]);

    const getRecentUpdates = useCallback(() => {
        return Object.entries(jobStatuses)
            .map(([jobId, data]) => ({
                jobId,
                status: data.status,
                updatedAt: new Date(data.updatedAt)
            }))
            .sort((a, b) => b.updatedAt - a.updatedAt);
    }, [jobStatuses]);

    return {
        jobStatuses,
        updateJobStatus,
        getJobStatus,
        getRecentUpdates
    };
}
