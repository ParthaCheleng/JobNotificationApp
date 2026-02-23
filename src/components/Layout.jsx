import React from 'react';
import './Layout.css';
import PrimaryWorkspace from './PrimaryWorkspace';
import SecondaryPanel from './SecondaryPanel';

export default function Layout() {
    return (
        <div className="layout-container">
            {/* Top Bar */}
            <header className="top-bar">
                <div className="top-bar-left">
                    <span className="app-name">Job Notification App</span>
                </div>
                <div className="top-bar-center">
                    <span className="progress-indicator">Step 1 / 4</span>
                </div>
                <div className="top-bar-right">
                    <span className="status-badge">In Progress</span>
                </div>
            </header>

            {/* Context Header */}
            <section className="context-header">
                <h1 className="context-headline">Set Configuration</h1>
                <p className="context-subtext">Define the criteria for your job alerts without technical jargon.</p>
            </section>

            {/* Main Workspace */}
            <main className="main-workspace">
                <div className="primary-column">
                    <PrimaryWorkspace />
                </div>
                <div className="secondary-column">
                    <SecondaryPanel />
                </div>
            </main>

            {/* Proof Footer */}
            <footer className="proof-footer">
                <ul className="checklist">
                    <li className="checked">✓ UI Built</li>
                    <li>○ Logic Working</li>
                    <li>○ Test Passed</li>
                    <li>○ Deployed</li>
                </ul>
            </footer>
        </div>
    );
}
