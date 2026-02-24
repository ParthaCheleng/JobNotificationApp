import React from 'react';
import './Toast.css';

export default function Toast({ message, visible }) {
    if (!visible) return null;

    return (
        <div className="toast-container visible">
            <div className="toast-content">
                <span>{message}</span>
            </div>
        </div>
    );
}
