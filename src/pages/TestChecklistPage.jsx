import React from 'react';
import { useTestStatus } from '../hooks/useTestStatus';
import './TestChecklistPage.css';

export default function TestChecklistPage() {
    const { testState, toggleTest, resetTests, testsPassed, isAllPassed, totalTests, testItems } = useTestStatus();

    return (
        <div className="test-page-container">
            <div className="test-page-card">
                <div className="test-header">
                    <h2>Pre-Flight Validation</h2>
                    <div className="test-summary">
                        <span className="test-counter">Tests Passed: {testsPassed}/{totalTests}</span>
                        {!isAllPassed && (
                            <span className="test-warning">Resolve all issues before shipping.</span>
                        )}
                    </div>
                </div>

                <div className="test-body">
                    <p className="test-description">
                        Before we build the production bundle, please explicitly confirm that the following critical pathways are functioning smoothly.
                    </p>

                    <div className="checklist-container">
                        {testItems.map((item) => {
                            const isChecked = !!testState[item.id];
                            return (
                                <label key={item.id} className={`checklist-item ${isChecked ? 'checked' : ''}`}>
                                    <div className="checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => toggleTest(item.id)}
                                        />
                                        <span className="custom-checkbox"></span>
                                    </div>
                                    <div className="item-content">
                                        <span className="item-label">{item.label}</span>
                                        {item.tooltip && (
                                            <span className="item-tooltip" title={item.tooltip}>
                                                How to test
                                            </span>
                                        )}
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div className="test-footer">
                    <button className="btn-secondary" onClick={resetTests}>
                        Reset Test Status
                    </button>
                    {isAllPassed ? (
                        <span className="success-text">All systems go! You may proceed to /jt/08-ship.</span>
                    ) : (
                        <span className="pending-text">{totalTests - testsPassed} tests remaining.</span>
                    )}
                </div>
            </div>
        </div>
    );
}
