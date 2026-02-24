import React, { useState } from 'react';
import { jobs } from '../data/jobs';
import { useSavedJobs } from '../hooks/useSavedJobs';
import { usePreferences } from '../hooks/usePreferences';
import { useJobStatus } from '../hooks/useJobStatus';
import { useToast } from '../hooks/useToast';
import { calculateMatchScore } from '../utils/matchEngine';
import JobCard from '../components/JobCard';
import JobDetailsModal from '../components/JobDetailsModal';
import EmptyState from '../components/EmptyState';
import Toast from '../components/Toast';

export default function SavedPage() {
    const { savedJobIds, isJobSaved, toggleSaveJob } = useSavedJobs();
    const { preferences } = usePreferences();
    const { getJobStatus, updateJobStatus } = useJobStatus();
    const { toast, showToast } = useToast();

    const [selectedJob, setSelectedJob] = useState(null);

    const savedJobsList = jobs
        .filter(job => savedJobIds.includes(job.id))
        .map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, preferences)
        }));

    const handleStatusChange = (jobId, newStatus) => {
        updateJobStatus(jobId, newStatus);
        showToast(`Status updated: ${newStatus}`, 'info');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="context-headline">Saved Opportunites</h1>
                <p className="context-subtext">Review the roles you've shortlisted.</p>
            </div>

            {savedJobsList.length === 0 ? (
                <EmptyState
                    title="Saved Opportunities"
                    subtitle="No bookmarks yet. Click 'Save' on any job card to track it here."
                />
            ) : (
                <div className="jobs-grid">
                    {savedJobsList.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            isSaved={isJobSaved(job.id)}
                            onSaveToggle={toggleSaveJob}
                            onViewClick={setSelectedJob}
                            matchScore={job.matchScore}
                            currentStatus={getJobStatus(job.id)}
                            onStatusChange={handleStatusChange}
                        />
                    ))}
                </div>
            )}

            {selectedJob && (
                <JobDetailsModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}

            {toast && <Toast message={toast.message} visible={true} />}
        </div>
    );
}
