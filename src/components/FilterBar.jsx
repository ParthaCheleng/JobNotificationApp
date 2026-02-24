import React from 'react';
import './FilterBar.css';
import { LOCATIONS } from '../data/jobs';

export default function FilterBar({ filters, setFilters }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="filter-bar">
            <div className="filter-search-group">
                <input
                    type="text"
                    name="keyword"
                    placeholder="Search roles, companies..."
                    value={filters.keyword}
                    onChange={handleChange}
                    className="filter-search-input"
                />
            </div>

            <div className="filter-dropdowns">
                <div className="filter-row">
                    <select
                        name="location"
                        value={filters.location || ''}
                        onChange={handleChange}
                        className="filter-select"
                    >
                        <option value="">All Locations</option>
                        {LOCATIONS.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>

                    <select
                        name="mode"
                        value={filters.mode || ''}
                        onChange={handleChange}
                        className="filter-select"
                    >
                        <option value="">Any Mode</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Onsite">Onsite</option>
                    </select>

                    <select
                        name="experience"
                        value={filters.experience || ''}
                        onChange={handleChange}
                        className="filter-select"
                    >
                        <option value="">Any Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1">0-1 Years</option>
                        <option value="1-3">1-3 Years</option>
                        <option value="3-5">3-5 Years</option>
                    </select>

                    <select
                        name="status"
                        value={filters.status || ''}
                        onChange={handleChange}
                        className="filter-select"
                    >
                        <option value="">All Statuses</option>
                        <option value="Not Applied">Not Applied</option>
                        <option value="Applied">Applied</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Selected">Selected</option>
                    </select>

                    <select
                        name="source"
                        value={filters.source || ''}
                        onChange={handleChange}
                        className="filter-select"
                    >
                        <option value="">Any Source</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Naukri">Naukri</option>
                        <option value="Indeed">Indeed</option>
                    </select>

                    <select
                        name="sort"
                        value={filters.sort || 'latest'}
                        onChange={handleChange}
                        className="filter-select"
                    >
                        <option value="latest">Latest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="match">Match Score</option>
                        <option value="salary">Salary Range</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
