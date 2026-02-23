import React, { useState, useEffect } from 'react';
import { usePreferences } from '../hooks/usePreferences';
import './SettingsPage.css';

const LOCATIONS = ["Bengaluru", "Pune", "Hyderabad", "Chennai", "Gurugram", "Noida", "Mumbai", "Delhi", "PAN India"];

export default function SettingsPage() {
    const { preferences, updatePreferences } = usePreferences();

    // Local state for the form so we don't save on every keystroke
    const [formData, setFormData] = useState(preferences);
    const [showSavedFeedback, setShowSavedFeedback] = useState(false);

    useEffect(() => {
        setFormData(preferences);
    }, [preferences]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'preferredLocations' || name === 'preferredMode') {
                const currentList = formData[name];
                if (checked) {
                    setFormData({ ...formData, [name]: [...currentList, value] });
                } else {
                    setFormData({ ...formData, [name]: currentList.filter(item => item !== value) });
                }
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSave = () => {
        updatePreferences({
            ...formData,
            minMatchScore: parseInt(formData.minMatchScore, 10) || 0
        });
        setShowSavedFeedback(true);
        setTimeout(() => setShowSavedFeedback(false), 3000);
    };

    const handleCancel = () => {
        setFormData(preferences); // reset to last saved state
    };

    return (
        <div className="settings-container">
            <h1 className="context-headline">Job Preferences</h1>
            <p className="context-subtext">Configure your ideal role to activate intelligent matching.</p>

            <div className="settings-card">
                <div className="form-group">
                    <label htmlFor="roleKeywords">Role Keywords (comma-separated)</label>
                    <input
                        type="text"
                        id="roleKeywords"
                        name="roleKeywords"
                        placeholder="e.g. Frontend, React, Lead"
                        value={formData.roleKeywords}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Preferred Locations</label>
                    <div className="checkbox-grid">
                        {LOCATIONS.map(loc => (
                            <label key={loc} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="preferredLocations"
                                    value={loc}
                                    checked={formData.preferredLocations.includes(loc)}
                                    onChange={handleChange}
                                />
                                {loc}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Mode</label>
                        <div className="checkbox-flex">
                            {['Remote', 'Hybrid', 'Onsite'].map(mode => (
                                <label key={mode} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="preferredMode"
                                        value={mode}
                                        checked={formData.preferredMode.includes(mode)}
                                        onChange={handleChange}
                                    />
                                    {mode}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="experienceLevel">Experience Level</label>
                        <select
                            id="experienceLevel"
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleChange}
                        >
                            <option value="">Any</option>
                            <option value="Fresher">Fresher</option>
                            <option value="0-1">0-1 Years</option>
                            <option value="1-3">1-3 Years</option>
                            <option value="3-5">3-5 Years</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="skills">Skills (comma-separated)</label>
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        placeholder="e.g. React, Node.js, Python"
                        value={formData.skills}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="minMatchScore">Match Threshold: {formData.minMatchScore}</label>
                    <div className="slider-container">
                        <input
                            type="range"
                            id="minMatchScore"
                            name="minMatchScore"
                            min="0"
                            max="100"
                            value={formData.minMatchScore}
                            onChange={handleChange}
                            className="range-slider"
                        />
                        <div className="slider-labels">
                            <span>0 (Broad)</span>
                            <span>100 (Strict)</span>
                        </div>
                    </div>
                </div>

                <div className="settings-actions">
                    {showSavedFeedback && <span className="saved-feedback">Preferences saved!</span>}
                    <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
                    <button className="btn-primary" onClick={handleSave}>Save Preferences</button>
                </div>
            </div>
        </div>
    );
}
