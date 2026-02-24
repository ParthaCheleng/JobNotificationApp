import React from 'react';
import { useTestStatus } from '../hooks/useTestStatus';
import { Link } from 'react-router-dom';
import './ShipPage.css';

export default function ShipPage() {
    const { isAllPassed, testsPassed, totalTests } = useTestStatus();

    if (!isAllPassed) {
        return (
            <div className="ship-page-container">
                <div className="ship-lock-card">
                    <div className="lock-icon">🔒</div>
                    <h2>Shipping Locked</h2>
                    <p className="lock-message">Complete all tests before shipping.</p>
                    <div className="lock-status">
                        <span>Current Progress: {testsPassed}/{totalTests}</span>
                    </div>
                    <Link to="/jt/07-test" className="btn-primary redirect-btn">
                        Go to Test Checklist
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="ship-page-container">
            <div className="ship-success-card">
                <div className="success-icon">🚀</div>
                <h2>Ready to Ship!</h2>
                <p className="success-message">All {totalTests} critical validation checks have passed.</p>
                <button className="btn-primary ship-btn" onClick={() => alert('Shipping protocol initiated!')}>
                    Deploy to Production
                </button>
            </div>
        </div>
    );
}
