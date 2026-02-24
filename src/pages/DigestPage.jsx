import React from 'react';
import { useDigest } from '../hooks/useDigest';
import { useJobStatus } from '../hooks/useJobStatus';
import { jobs } from '../data/jobs';
import EmptyState from '../components/EmptyState';
import './DigestPage.css';

export default function DigestPage() {
    const { todaysDigest, generateDigest, hasPreferences } = useDigest();
    const { getRecentUpdates } = useJobStatus();

    const handleGenerate = () => {
        // Only does something if digest not yet created today
        if (!todaysDigest) {
            generateDigest();
        }
    };

    const handleCopy = () => {
        if (!todaysDigest) return;
        const textToCopy = `My 9AM Job Digest - Top ${todaysDigest.length} Hits\n\n` +
            todaysDigest.map((job, i) =>
                `${i + 1}. ${job.title} at ${job.company}\n   Location: ${job.location} | Match: ${job.matchScore}%\n   Link: ${job.applyUrl}`
            ).join('\n\n');

        navigator.clipboard.writeText(textToCopy)
            .then(() => alert('Digest copied to clipboard!'))
            .catch(() => alert('Failed to copy.'));
    };

    const handleEmail = () => {
        if (!todaysDigest) return;
        const subject = encodeURIComponent("My 9AM Job Digest");

        // Truncate to 5 jobs to strictly stay beneath the Windows 2048 character limit for mailto: arrays
        const emailJobs = todaysDigest.slice(0, 5);
        let bodyText = `Here are my top job matches for today:\n\n` +
            emailJobs.map((job, i) =>
                `${i + 1}. ${job.title} at ${job.company}\n   Location: ${job.location} | Match: ${job.matchScore}%\n   Link: ${job.applyUrl}`
            ).join('\n\n');

        if (todaysDigest.length > 5) {
            bodyText += `\n\n...and ${todaysDigest.length - 5} more matches waiting on your Dashboard!`;
        }

        const body = encodeURIComponent(bodyText);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    const todayDateStr = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const recentUpdates = getRecentUpdates();

    const renderRecentUpdatesBlock = () => {
        if (recentUpdates.length === 0) return null;

        return (
            <div className="digest-updates-card">
                <div className="updates-header">
                    <h3>Recent Status Updates</h3>
                </div>
                <div className="updates-list">
                    {recentUpdates.map((update, idx) => {
                        const sourceJob = jobs.find(j => j.id === update.jobId);
                        if (!sourceJob) return null;

                        // Map status to css classes cleanly
                        let statusClass = 'status-neutral';
                        if (update.status === 'Applied') statusClass = 'status-applied';
                        if (update.status === 'Rejected') statusClass = 'status-rejected';
                        if (update.status === 'Selected') statusClass = 'status-selected';

                        return (
                            <div key={idx} className="update-item-row">
                                <div className="update-item-info">
                                    <h4>{sourceJob.title}</h4>
                                    <span className="update-company">{sourceJob.company}</span>
                                </div>
                                <div className="update-meta-info">
                                    <span className={`update - status - badge ${statusClass} `}>
                                        {update.status}
                                    </span>
                                    <span className="update-time">
                                        {update.updatedAt.toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    if (!hasPreferences) {
        return (
            <div className="digest-container">
                <EmptyState
                    title="Action Required"
                    subtitle="Set preferences to generate a personalized digest."
                />
            </div>
        );
    }

    if (todaysDigest === null) {
        return (
            <div className="digest-container center-content">
                <h1 className="context-headline">Daily Digest Engine</h1>
                <p className="context-subtext">Click below to parse roles and assemble your curated 10-job list.</p>
                <button className="btn-primary btn-large" onClick={handleGenerate}>
                    Generate Today's 9AM Digest (Simulated)
                </button>
                <p className="demo-note">Demo Mode: Daily 9AM trigger simulated manually.</p>
                {renderRecentUpdatesBlock()}
            </div>
        );
    }

    if (todaysDigest.length === 0) {
        return (
            <div className="digest-container center-content">
                <EmptyState
                    title="A Quiet Day"
                    subtitle="No matching roles today. Check again tomorrow."
                />
                {renderRecentUpdatesBlock()}
            </div>
        );
    }

    return (
        <div className="digest-container email-layout">
            <div className="digest-layout-wrapper">
                <div className="digest-email-card">

                    <div className="digest-header">
                        <h2>Top {todaysDigest.length} Jobs For You - 9AM Digest</h2>
                        <span className="digest-date">{todayDateStr}</span>
                    </div>

                    <div className="digest-list">
                        {todaysDigest.map((job) => (
                            <div key={job.id} className="digest-item-row">
                                <div className="digest-item-details">
                                    <h4>{job.title}</h4>
                                    <p className="digest-company">{job.company}</p>
                                    <p className="digest-meta">📍 {job.location} • 🎓 {job.experience}</p>
                                </div>
                                <div className="digest-item-actions">
                                    <span className="digest-score">{job.matchScore}% Match</span>
                                    <button
                                        className="btn-primary"
                                        onClick={() => window.open(job.applyUrl, '_blank')}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="digest-footer">
                        <p>This digest was generated based on your preferences.</p>
                        <div className="digest-export-actions">
                            <button className="btn-secondary" onClick={handleCopy}>Copy Digest to Clipboard</button>
                            <button className="btn-secondary" onClick={handleEmail}>Create Email Draft</button>
                        </div>
                    </div>
                </div>

                {renderRecentUpdatesBlock()}
            </div>
        </div>
    );
}
