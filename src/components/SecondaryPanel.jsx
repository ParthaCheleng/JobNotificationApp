import React from 'react';
import './SecondaryPanel.css';

export default function SecondaryPanel() {
    return (
        <aside className="panel-container">
            <div className="explanation-block">
                <h3>How it works</h3>
                <p>Define your job criteria explicitly to avoid receiving mismatched notifications.</p>
                <p>This strict filtering ensures high-quality alerts.</p>
            </div>

            <div className="prompt-block">
                <h3>Copyable Format</h3>
                <p>Share these criteria with team members or save for later referencing.</p>
                <div className="copy-box">
                    <code>
                        Title: Sr. Frontend<br />
                        Loc: Remote, NY<br />
                        Min: $100k<br />
                        Type: Full-time
                    </code>
                </div>
                <button className="btn-secondary copy-btn">Copy to Clipboard</button>
            </div>
        </aside>
    );
}
