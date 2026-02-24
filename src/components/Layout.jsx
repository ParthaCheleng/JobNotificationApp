import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import './Layout.css';

export default function Layout() {
    return (
        <div className="layout-container">
            {/* Navigation Shell */}
            <Navigation />

            {/* Main Routed Workspace */}
            <main className="main-content-area">
                <Outlet />
            </main>

        </div>
    );
}
