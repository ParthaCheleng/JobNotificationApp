import React, { useState, useMemo } from 'react';
import { jobs } from '../data/jobs';
import { useSavedJobs } from '../hooks/useSavedJobs';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import JobDetailsModal from '../components/JobDetailsModal';
import EmptyState from '../components/EmptyState';
import './DashboardPage.css';

export default function DashboardPage() {
    const { isJobSaved, toggleSaveJob } = useSavedJobs();
    const [selectedJob, setSelectedJob] = useState(null);

    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        sort: 'latest' // 'latest' or 'oldest'
    });

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            // Keyword Match (Title or Company)
            if (filters.keyword) {
                const lowerKeyword = filters.keyword.toLowerCase();
                const matchTitle = job.title.toLowerCase().includes(lowerKeyword);
                const matchCompany = job.company.toLowerCase().includes(lowerKeyword);
                if (!matchTitle && !matchCompany) return false;
            }

            // Exact matches for dropdowns
            if (filters.location && job.location !== filters.location) return false;
            if (filters.mode && job.mode !== filters.mode) return false;
            if (filters.experience && job.experience !== filters.experience) return false;
            if (filters.source && job.source !== filters.source) return false;

            return true;
        }).sort((a, b) => {
            // Sorting based on days ago
            if (filters.sort === 'oldest') {
                return a.postedDaysAgo - b.postedDaysAgo; // higher days ago = older vs lower days ago = newer -> wait.
                // Actually: postedDaysAgo: 0 is newest. 10 is oldest.
                // If oldest first: we want 10 to come before 0.
                // So b.postedDaysAgo - a.postedDaysAgo
            }
            // Latest first (default): 0 comes before 10.
            return a.postedDaysAgo - b.postedDaysAgo;
        });
    }, [filters]);

    // Fix sorting logic mathematically
    // Actually, if a.posted = 10 and b.posted = 0
    // 'oldest' first means 10 should come before 0. So b - a.
    // 'latest' first means 0 should come before 10. So a - b.
    if (filters.sort === 'oldest') {
        filteredJobs.reverse();
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="context-headline">Job Board</h1>
                <p className="context-subtext">Discover perfectly matched premium roles.</p>
            </div>

            <FilterBar filters={filters} setFilters={setFilters} />

            {filteredJobs.length === 0 ? (
                <EmptyState
                    title="No jobs match your search."
                    subtitle="Try adjusting your filters or keyword to find more opportunities."
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
