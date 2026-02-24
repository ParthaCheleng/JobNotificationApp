import React, { useState, useMemo } from 'react';
import { jobs } from '../data/jobs';
import { useSavedJobs } from '../hooks/useSavedJobs';
import { usePreferences } from '../hooks/usePreferences';
import { calculateMatchScore } from '../utils/matchEngine';
import { useJobStatus } from '../hooks/useJobStatus';
import { useToast } from '../hooks/useToast';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import JobDetailsModal from '../components/JobDetailsModal';
import Toast from '../components/Toast';
import EmptyState from '../components/EmptyState';
import './DashboardPage.css';

export default function DashboardPage() {
    const { savedJobIds, isJobSaved, toggleSaveJob } = useSavedJobs();
    const { preferences, hasPreferences } = usePreferences();
    const { getJobStatus, updateJobStatus } = useJobStatus();
    const { toast, showToast } = useToast();

    const [selectedJob, setSelectedJob] = useState(null);
    const [showThresholdOnly, setShowThresholdOnly] = useState(false);

    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        status: '',
        sort: 'latest'
    });

    const scoredJobs = useMemo(() => {
        return jobs.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, preferences)
        }));
    }, [preferences]);

    const handleStatusChange = (jobId, newStatus) => {
        updateJobStatus(jobId, newStatus);
        showToast(`Status updated: ${newStatus}`, 'info');
    };

    const filteredJobs = useMemo(() => {
        return scoredJobs.filter(job => {
            if (showThresholdOnly && job.matchScore < (preferences.minMatchScore || 0)) {
                return false;
            }

            if (filters.keyword) {
                const lowerKeyword = filters.keyword.toLowerCase();
                const matchTitle = job.title.toLowerCase().includes(lowerKeyword);
                const matchCompany = job.company.toLowerCase().includes(lowerKeyword);
                if (!matchTitle && !matchCompany) return false;
            }

            if (filters.location && job.location !== filters.location) return false;
            if (filters.mode && job.mode !== filters.mode) return false;
            if (filters.experience && job.experience !== filters.experience) return false;
            if (filters.source && job.source !== filters.source) return false;

            const jobStatus = getJobStatus(job.id);
            if (filters.status && jobStatus !== filters.status) return false;

            return true;
        }).sort((a, b) => {
            if (filters.sort === 'oldest') {
                return a.postedDaysAgo - b.postedDaysAgo;
            } else if (filters.sort === 'match') {
                return b.matchScore - a.matchScore;
            } else if (filters.sort === 'salary') {
                const extractNum = (salaryStr) => {
                    const match = salaryStr.match(/(\d+)/);
                    return match ? parseInt(match[1], 10) : 0;
                };
                return extractNum(b.salaryRange) - extractNum(a.salaryRange);
            }
            return a.postedDaysAgo - b.postedDaysAgo;
        });
    }, [filters, scoredJobs, showThresholdOnly, preferences.minMatchScore, getJobStatus]);

    return (
        <div className="dashboard-container">
            {!hasPreferences && (
                <div className="preferences-banner" onClick={() => window.location.href = '/settings'}>
                    Set your preferences to activate intelligent matching. Click here to configure.
                </div>
            )}

            <div className="dashboard-header">
                <h1 className="context-headline">Job Board</h1>
                <p className="context-subtext">Discover perfectly matched premium roles.</p>
            </div>

            <div className="threshold-toggle">
                <label>
                    <input
                        type="checkbox"
                        checked={showThresholdOnly}
                        onChange={(e) => setShowThresholdOnly(e.target.checked)}
                    />
                    Show only jobs above my threshold ({preferences.minMatchScore}%)
                </label>
            </div>

            <FilterBar filters={filters} setFilters={setFilters} />

            {filteredJobs.length === 0 ? (
                <EmptyState
                    title="No roles match your criteria."
                    subtitle="Adjust filters or lower threshold."
                />
            ) : (
                <div className="jobs-grid">
                    {filteredJobs.map(job => (
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
