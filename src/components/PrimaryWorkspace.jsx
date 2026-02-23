import React from 'react';
import './PrimaryWorkspace.css';

export default function PrimaryWorkspace() {
    return (
        <div className="workspace-container">
            <div className="card">
                <h2 className="card-title">Job Criteria</h2>

                <div className="form-group">
                    <label htmlFor="job-title">Job Title</label>
                    <input type="text" id="job-title" placeholder="e.g. Senior Frontend Engineer" />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" placeholder="e.g. Remote, New York" />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="min-salary">Minimum Salary</label>
                        <input type="number" id="min-salary" placeholder="$100k" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="job-type">Job Type</label>
                        <select id="job-type">
                            <option>Full-time</option>
                            <option>Contract</option>
                            <option>Part-time</option>
                        </select>
                    </div>
                </div>

                <div className="card-actions">
                    <button className="btn-secondary">Cancel</button>
                    <button className="btn-primary">Save Criteria</button>
                </div>
            </div>

            <div className="card">
                <h2 className="card-title">Error State Demonstration</h2>
                <div className="form-group error-state">
                    <label htmlFor="error-input">Invalid Keyword</label>
                    <input type="text" id="error-input" defaultValue="asdfg!@#" />
                    <span className="error-message">Special characters are not allowed. Please use only letters and numbers.</span>
                </div>
            </div>
        </div>
    );
}
