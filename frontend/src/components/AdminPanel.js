import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
    const [brands, setBrands] = useState([]);
    const [newBrand, setNewBrand] = useState('');
    const [newSubsidiary, setNewSubsidiary] = useState('');
    const [states, setStates] = useState([]);
    const [newState, setNewState] = useState('');
    const [newCity, setNewCity] = useState('');

    useEffect(() => {
        fetch('/api/brands')
            .then(response => response.json())
            .then(data => setBrands(data));

        fetch('/api/states')
            .then(response => response.json())
            .then(data => setStates(data));
    }, []);

    const handleAddBrand = () => {
        const updatedBrands = [...brands, { name: newBrand, subsidiaries: [] }];
        setBrands(updatedBrands);
        setNewBrand('');
    };

    const handleAddSubsidiary = (brandIndex) => {
        const updatedBrands = [...brands];
        updatedBrands[brandIndex].subsidiaries.push(newSubsidiary);
        setBrands(updatedBrands);
        setNewSubsidiary('');
    };

    const handleAddState = () => {
        const updatedStates = [...states, { name: newState, cities: [] }];
        setStates(updatedStates);
        setNewState('');
    };

    const handleAddCity = (stateIndex) => {
        const updatedStates = [...states];
        updatedStates[stateIndex].cities.push(newCity);
        setStates(updatedStates);
        setNewCity('');
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <h3>Add Brand</h3>
            <input
                type="text"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                placeholder="Brand Name"
            />
            <button onClick={handleAddBrand}>Add Brand</button>

            <h3>Manage Brands</h3>
            {brands.map((brand, index) => (
                <div key={index}>
                    <h4>{brand.name}</h4>
                    <h5>Subsidiaries</h5>
                    <ul>
                        {brand.subsidiaries.map((subsidiary, subIndex) => (
                            <li key={subIndex}>{subsidiary}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={newSubsidiary}
                        onChange={(e) => setNewSubsidiary(e.target.value)}
                        placeholder="New Subsidiary"
                    />
                    <button onClick={() => handleAddSubsidiary(index)}>Add Subsidiary</button>
                </div>
            ))}

            <h3>Add State</h3>
            <input
                type="text"
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                placeholder="State Name"
            />
            <button onClick={handleAddState}>Add State</button>

            <h3>Manage States</h3>
            {states.map((state, index) => (
                <div key={index}>
                    <h4>{state.name}</h4>
                    <h5>Cities</h5>
                    <ul>
                        {state.cities.map((city, cityIndex) => (
                            <li key={cityIndex}>{city}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="New City"
                    />
                    <button onClick={() => handleAddCity(index)}>Add City</button>
                </div>
            ))}
        </div>
    );
};

export default AdminPanel;
