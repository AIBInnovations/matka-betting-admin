import React, { useState } from 'react';

function MarketFormModal({ onClose, onSave }) {
    const [market, setMarket] = useState({
        name: '',
        openTime: '',  // These will now hold time in 'HH:mm' format
        closeTime: '',
        type: '',
        isBettingOpen: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMarket(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(market);
        onClose(); // Close modal after saving
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center px-4 py-6">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Market</h2>
                <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Market Name:</label>
                        <input type="text" name="name" value={market.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Open Time:</label>
                        <input type="time" name="openTime" value={market.openTime} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Close Time:</label>
                        <input type="time" name="closeTime" value={market.closeTime} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Type of Market:</label>
                        <input type="text" name="type" value={market.type} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="flex items-center mt-4">
                        <label className="text-sm font-medium text-gray-600 mr-2">Is Betting Open:</label>
                        <input type="checkbox" name="isBettingOpen" checked={market.isBettingOpen} onChange={handleChange} className="scale-90" />
                    </div>
                    <div className="flex justify-end space-x-3 mt-4">
                        <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="bg-blue-400 text-white px-4 py-1 rounded hover:bg-blue-500">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MarketFormModal;