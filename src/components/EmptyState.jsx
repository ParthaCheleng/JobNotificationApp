import React from 'react';
import './EmptyState.css';

export default function EmptyState({ title, subtitle }) {
    return (
        <div className="empty-state-container">
            <h1 className="empty-state-headline">{title}</h1>
            <p className="empty-state-subtext">{subtitle}</p>
        </div>
    );
}
