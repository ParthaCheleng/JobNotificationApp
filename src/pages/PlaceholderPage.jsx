import React from 'react';
import './PlaceholderPage.css';

export default function PlaceholderPage({ title }) {
    return (
        <div className="placeholder-container">
            <h1 className="context-headline">{title}</h1>
            <p className="context-subtext">This section will be built in the next step.</p>
        </div>
    );
}
