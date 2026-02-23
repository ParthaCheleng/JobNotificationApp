import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Saved', path: '/saved' },
        { name: 'Digest', path: '/digest' },
        { name: 'Settings', path: '/settings' },
        { name: 'Proof', path: '/proof' }
    ];

    return (
        <nav className="navigation-shell">
            <div className="nav-container">
                <div className="nav-brand">
                    <NavLink to="/" onClick={closeMobileMenu} className="brand-link">
                        Job Notification App
                    </NavLink>
                </div>

                {/* Desktop Navigation */}
                <div className="nav-links desktop-only">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Hamburger Toggle */}
                <button
                    className="mobile-toggle desktop-hidden"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span className="hamburger-icon">☰</span>
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="mobile-dropdown desktop-hidden">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) => (isActive ? 'mobile-nav-item active' : 'mobile-nav-item')}
                            onClick={closeMobileMenu}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}
