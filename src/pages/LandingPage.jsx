import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1 className="landing-headline">Stop Missing The Right Jobs.</h1>
                <p className="landing-subtext">Precision-matched job discovery delivered daily at 9AM.</p>

                <div className="landing-actions">
                    <button
                        className="btn-primary landing-cta"
                        onClick={() => navigate('/settings')}
                    >
                        Start Tracking
                    </button>
                </div>
            </div>
        </div>
    );
}
