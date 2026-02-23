import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
    return (
        <div className="not-found-container">
            <h1 className="context-headline">Page Not Found</h1>
            <p className="context-subtext">The page you are looking for does not exist.</p>

            <div className="not-found-actions">
                <Link to="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                    Return to Hub
                </Link>
            </div>
        </div>
    );
}
