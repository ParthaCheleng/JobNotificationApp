import React, { useState } from 'react';
import { jobs } from '../data/jobs';
import { useSavedJobs } from '../hooks/useSavedJobs';
import { usePreferences } from '../hooks/usePreferences';
import { calculateMatchScore } from '../utils/matchEngine';
import JobCard from '../components/JobCard';
import JobDetailsModal from '../components/JobDetailsModal';
import EmptyState from '../components/EmptyState';
import './DashboardPage.css'; // Reuse dashboard grid styles

export default function SavedPage() {
    const { savedJobIds, isJobSaved, toggleSaveJob } = useSavedJobs();
    const { preferences } = usePreferences();
    const [selectedJob, setSelectedJob] = useState(null);

    const savedJobsList = jobs
        .filter(job => savedJobIds.includes(job.id))
        .map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, preferences)
        }));

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="context-headline">Saved Opportunities</h1>
                <p className="context-subtext">Review and track jobs you've bookmarked.</p>
            </div>

            {savedJobsList.length === 0 ? (
                <EmptyState
                    title="Saved Opportunities"
                    subtitle="No data yet. Bookmarked jobs will appear here for easy reference."
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
        </div>
    );
}
