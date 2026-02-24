import React from 'react';
import './JobCard.css';

export default function JobCard({
    job,
    isSaved,
    onSaveToggle,
    onViewClick,
    matchScore,
    currentStatus = "Not Applied",
    onStatusChange
}) {
    const getScoreClass = (score) => {
        if (score >= 80) return 'badge-success';
        if (score >= 60) return 'badge-warning';
        if (score >= 40) return 'badge-neutral';
        return 'badge-grey';
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Applied': return 'status-applied';
            case 'Rejected': return 'status-rejected';
            case 'Selected': return 'status-selected';
            default: return 'status-neutral';
        }
    };

    return (
        <div className="job-card">
            <div className="job-card-header">
                <div>
                    <h3 className="job-title">{job.title}</h3>
                    {matchScore !== undefined && (
                        <div className={`match-badge ${getScoreClass(matchScore)}`}>
                            Match: {matchScore}%
                        </div>
                    )}
                </div>
                <span className="source-badge">{job.source}</span>
            </div>

            <p className="job-company">{job.company}</p>

            <div className="job-meta">
                <span className="meta-item">📍 {job.location} ({job.mode})</span>
                <span className="meta-item">🎓 {job.experience}</span>
                <span className="meta-item">💰 {job.salaryRange}</span>
            </div>

            <div className="job-tracker-row">
                <label className="status-label">Tracker Status:</label>
                <select
                    className={`status-select ${getStatusClass(currentStatus)}`}
                    value={currentStatus}
                    onChange={(e) => onStatusChange && onStatusChange(job.id, e.target.value)}
                >
                    <option value="Not Applied">Not Applied</option>
                    <option value="Applied">Applied</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Selected">Selected</option>
                </select>
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
