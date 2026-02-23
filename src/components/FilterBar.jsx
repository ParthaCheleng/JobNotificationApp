import React from 'react';
import './FilterBar.css';

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
                <select name="location" value={filters.location} onChange={handleChange}>
                    <option value="">All Locations</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Noida">Noida</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="PAN India">PAN India</option>
                </select>

                <select name="mode" value={filters.mode} onChange={handleChange}>
                    <option value="">All Modes</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                </select>

                <select name="experience" value={filters.experience} onChange={handleChange}>
                    <option value="">Any Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1">0-1 Years</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                </select>

                <select name="source" value={filters.source} onChange={handleChange}>
                    <option value="">All Sources</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Indeed">Indeed</option>
                </select>

                <select name="sort" value={filters.sort} onChange={handleChange}>
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
        </div>
    );
}
