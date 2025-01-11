import React, { useState } from 'react';

function ActiveMarketsTable({ marketsData, handleToggleBetting, handleUpdateResult, handleDeleteMarket }) {
    const [resultInputs, setResultInputs] = useState({});

    const handleResultChange = (id, value) => {
        setResultInputs((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div>
            <table className="min-w-full bg-white divide-y divide-gray-200 shadow-sm mb-6">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Market Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Open Time
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Close Time
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Market ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Betting
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Result
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {marketsData.map((market) => (
                        <tr key={market.marketId} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-800">{market.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{market.openTime}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{market.closeTime}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{market.marketId}</td>
                            <td className="px-4 py-3 text-sm">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={market.isBettingOpen}
                                        onChange={() => handleToggleBetting(market.marketId, market.isBettingOpen)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td className="px-4 py-3 text-sm">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={resultInputs[market.marketId] || market.result || ''}
                                        onChange={(e) => handleResultChange(market.marketId, e.target.value)}
                                        placeholder="Enter result"
                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                    />
                                    <button
                                        onClick={() =>
                                            handleUpdateResult(market.marketId, resultInputs[market.marketId] || '')
                                        }
                                        className="text-green-500 hover:text-green-700"
                                    >
                                        <i className="fas fa-check"></i>
                                    </button>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-right space-x-2">
                                <button
                                    onClick={() => handleDeleteMarket(market.marketId)}
                                    className="text-red-500 hover:text-red-700 text-base p-1"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ActiveMarketsTable;
