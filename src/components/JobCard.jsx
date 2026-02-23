import React from 'react';
import './JobCard.css';

export default function JobCard({
    job,
    isSaved,
    onSaveToggle,
    onViewClick
}) {
    return (
        <div className="job-card">
            <div className="job-card-header">
                <h3 className="job-title">{job.title}</h3>
                <span className="source-badge">{job.source}</span>
            </div>

            <p className="job-company">{job.company}</p>

            <div className="job-meta">
                <span className="meta-item">📍 {job.location} ({job.mode})</span>
                <span className="meta-item">🎓 {job.experience}</span>
                <span className="meta-item">💰 {job.salaryRange}</span>
            </div>

            <div className="job-footer">
                <span className="posted-time">
                    {job.postedDaysAgo === 0 ? 'Posted today' : `Posted ${job.postedDaysAgo} days ago`}
                </span>
                <div className="job-actions">
                    <button className="btn-secondary" onClick={() => onViewClick(job)}>
                        View
                    </button>
                    <button
                        className="btn-secondary"
                        onClick={() => onSaveToggle(job.id)}
                    >
                        {isSaved ? 'Unsave' : 'Save'}
                    </button>
                    <button
                        className="btn-primary"
                        onClick={() => window.open(job.applyUrl, '_blank')}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}
