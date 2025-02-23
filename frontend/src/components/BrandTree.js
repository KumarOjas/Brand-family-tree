import React, { useState } from 'react';
import ReviewForm from './ReviewForm';

const BrandTree = () => {
    const [brands, setBrands] = useState([
        {
            name: 'Brand A',
            subsidiaries: [
                { name: 'Subsidiary A1' },
                { name: 'Subsidiary A2' },
                { name: 'Subsidiary A3' }
            ]
        },
        {
            name: 'Brand B',
            subsidiaries: [
                { name: 'Subsidiary B1' },
                { name: 'Subsidiary B2' },
                { name: 'Subsidiary B3' }
            ]
        },
        {
            name: 'Brand C',
            subsidiaries: [
                { name: 'Subsidiary C1' },
                { name: 'Subsidiary C2' },
                { name: 'Subsidiary C3' }
            ]
        }
    ]);

    const [selectedBrand, setSelectedBrand] = useState(null);

    const handleBrandClick = (brand) => {
        setSelectedBrand(brand);
    };

    return (
        <div>
            {brands.map((brand, index) => (
                <div key={index}>
                    <h3 onClick={() => handleBrandClick(brand)}>{brand.name}</h3>
                    {selectedBrand === brand && (
                        <div>
                            <ul>
                                {brand.subsidiaries.map((subsidiary, subIndex) => (
                                    <li key={subIndex}>{subsidiary.name}</li>
                                ))}
                            </ul>
                            <ReviewForm />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BrandTree;
