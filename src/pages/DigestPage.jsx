import React from 'react';
import { useDigest } from '../hooks/useDigest';
import EmptyState from '../components/EmptyState';
import './DigestPage.css';

export default function DigestPage() {
    const { todaysDigest, generateDigest, hasPreferences } = useDigest();

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
        const body = encodeURIComponent(
            `Here are my top ${todaysDigest.length} job matches for today:\n\n` +
            todaysDigest.map((job, i) =>
                `${i + 1}. ${job.title} at ${job.company}\n   Location: ${job.location} | Match: ${job.matchScore}%\n   Link: ${job.applyUrl}`
            ).join('\n\n')
        );
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    const todayDateStr = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

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
            </div>
        );
    }

    if (todaysDigest.length === 0) {
        return (
            <div className="digest-container">
                <EmptyState
                    title="A Quiet Day"
                    subtitle="No matching roles today. Check again tomorrow."
                />
            </div>
        );
    }

    return (
        <div className="digest-container email-layout">
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
        </div>
    );
}
