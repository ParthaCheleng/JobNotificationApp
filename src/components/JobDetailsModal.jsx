import React from 'react';
import './JobDetailsModal.css';

export default function JobDetailsModal({ job, onClose }) {
    if (!job) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{job.title}</h2>
                    <button className="modal-close" onClick={onClose} aria-label="Close modal">
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    <p className="modal-company">{job.company}</p>

                    <div className="modal-meta">
                        <span>📍 {job.location} ({job.mode})</span>
                        <span>🎓 {job.experience}</span>
                        <span>💰 {job.salaryRange}</span>
                    </div>

                    <div className="modal-section border-top">
                        <h4 className="section-title">About the Role</h4>
                        <p className="section-text">{job.description}</p>
                    </div>

                    <div className="modal-section">
                        <h4 className="section-title">Required Skills</h4>
                        <div className="skills-container">
                            {job.skills.map((skill) => (
                                <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="modal-footer border-top">
                    <button className="btn-secondary" onClick={onClose}>Close</button>
                    <button
                        className="btn-primary"
                        onClick={() => window.open(job.applyUrl, '_blank')}
                    >
                        Apply Now ({job.source})
                    </button>
                </div>
            </div>
        </div>
    );
}
