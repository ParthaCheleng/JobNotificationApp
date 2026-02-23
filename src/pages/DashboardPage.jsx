import React, { useState, useMemo } from 'react';
import { jobs } from '../data/jobs';
import { useSavedJobs } from '../hooks/useSavedJobs';
import { usePreferences } from '../hooks/usePreferences';
import { calculateMatchScore } from '../utils/matchEngine';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import JobDetailsModal from '../components/JobDetailsModal';
import EmptyState from '../components/EmptyState';
import './DashboardPage.css';

export default function DashboardPage() {
    const { isJobSaved, toggleSaveJob } = useSavedJobs();
    const { preferences, hasPreferences } = usePreferences();
    const [selectedJob, setSelectedJob] = useState(null);
    const [showOnlyThreshold, setShowOnlyThreshold] = useState(false);

    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        sort: 'latest' // 'latest', 'oldest', 'match', 'salary'
    });

    // Calculate scores for all jobs first so we can sort and filter by them
    const scoredJobs = useMemo(() => {
        return jobs.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, preferences)
        }));
    }, [preferences]);

    const filteredJobs = useMemo(() => {
        return scoredJobs.filter(job => {
            // 1. Threshold Filter
            if (showOnlyThreshold && job.matchScore < (preferences.minMatchScore || 0)) {
                return false;
            }

            // 2. Keyword Match (Title or Company) -> strict AND
            if (filters.keyword) {
                const lowerKeyword = filters.keyword.toLowerCase();
                const matchTitle = job.title.toLowerCase().includes(lowerKeyword);
                const matchCompany = job.company.toLowerCase().includes(lowerKeyword);
                if (!matchTitle && !matchCompany) return false;
            }

            // 3. Exact matches for dropdowns -> strict AND
            if (filters.location && job.location !== filters.location && !(job.location === 'PAN India' && filters.location !== '')) {
                // Allow PAN India jobs to show up for specific location queries if remote, but let's stick to strict AND rules.
                if (job.location !== filters.location) return false;
            }
            if (filters.mode && job.mode !== filters.mode) return false;
            if (filters.experience && job.experience !== filters.experience) return false;
            if (filters.source && job.source !== filters.source) return false;

            return true;
        }).sort((a, b) => {
            if (filters.sort === 'oldest') {
                return b.postedDaysAgo - a.postedDaysAgo;
            } else if (filters.sort === 'match') {
                return b.matchScore - a.matchScore; // Highest first
            } else if (filters.sort === 'salary') {
                // Very basic salary extraction purely for sort functionality
                const extractNum = (salaryStr) => {
                    const match = salaryStr.match(/(\d+)/);
                    return match ? parseInt(match[1], 10) : 0;
                };
                return extractNum(b.salaryRange) - extractNum(a.salaryRange);
            }
            // Latest first (default)
            return a.postedDaysAgo - b.postedDaysAgo;
        });
    }, [filters, scoredJobs, showOnlyThreshold, preferences.minMatchScore]);

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
                        checked={showOnlyThreshold}
                        onChange={(e) => setShowOnlyThreshold(e.target.checked)}
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
