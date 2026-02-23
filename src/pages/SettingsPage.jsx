import React from 'react';
import './SettingsPage.css';

export default function SettingsPage() {
    return (
        <div className="settings-container">
            <h1 className="context-headline">Job Preferences</h1>
            <p className="context-subtext">Configure your ideal role to refine your 9AM daily digest.</p>

            <div className="settings-card">
                <div className="form-group">
                    <label htmlFor="role-keywords">Role Keywords</label>
                    <input
                        type="text"
                        id="role-keywords"
                        placeholder="e.g. Frontend, React, Lead"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="preferred-locations">Preferred Locations</label>
                    <input
                        type="text"
                        id="preferred-locations"
                        placeholder="e.g. New York, Remote"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="work-mode">Mode</label>
                        <select id="work-mode">
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                            <option value="onsite">Onsite</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="experience-level">Experience Level</label>
                        <select id="experience-level">
                            <option value="entry">Entry Level</option>
                            <option value="mid">Mid Level</option>
                            <option value="senior">Senior</option>
                            <option value="lead">Lead / Staff</option>
                        </select>
                    </div>
                </div>

                <div className="settings-actions">
                    <button className="btn-secondary">Cancel</button>
                    <button className="btn-primary">Save Preferences</button>
                </div>
            </div>
        </div>
    );
}
