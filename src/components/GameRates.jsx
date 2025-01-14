import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GameRates() {
    const [rates, setRates] = useState({
        singleDigit: '',
        jodiDigit: '',
        singlePana: '',
        doublePana: '',
        triplePana: '',
    });

    useEffect(() => {
        const fetchRates = async () => {
            console.log(localStorage.getItem('token'))
            try {
                const response = await axios.get('https://only-backend-je4j.onrender.com/api/admin/winning-ratios', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
                    }
                });
                const { data } = response;
                if (data) {
                    setRates({
                        singleDigit: data.singleDigit || '',
                        jodiDigit: data.jodiDigit || '',
                        singlePana: data.singlePana || '',
                        doublePana: data.doublePana || '',
                        triplePana: data.triplePana || '',
                    });
                }
            } catch (error) {
                console.error('Error fetching rates:', error);
                // Handle errors here, perhaps by setting some error state
            }
        };

        fetchRates();
    }, []); // Empty dependency array ensures this runs once after the component mounts

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRates(prevRates => ({
            ...prevRates,
            [name]: value
        }));
    };

    return (
        <div className="p-8 bg-white shadow-md rounded">
            <h2 className="text-2xl font-semibold mb-4">Game Rates</h2>
            <form>
                {Object.keys(rates).map((key) => (
                    <div className="mb-4" key={key}>
                        <label htmlFor={key} className="block mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={rates[key]}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded mr-2"
                        />
                        <span className="text-green-500">✓</span>
                    </div>
                ))}
            </form>
        </div>
    );
}

export default GameRates;
