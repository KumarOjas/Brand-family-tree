import React, { useState } from 'react';

const LocationDropdown = () => {
    const [selectedState, setSelectedState] = useState('');
    const [cities, setCities] = useState([]);
    
    const states = {
        'State 1': ['City 1-1', 'City 1-2', 'City 1-3'],
        'State 2': ['City 2-1', 'City 2-2', 'City 2-3'],
        'State 3': ['City 3-1', 'City 3-2', 'City 3-3'],
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setCities(states[state] || []);
    };

    return (
        <div>
            <select onChange={handleStateChange}>
                <option value="">Select State</option>
                {Object.keys(states).map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                ))}
            </select>
            {selectedState && (
                <select>
                    <option value="">Select City</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default LocationDropdown;
