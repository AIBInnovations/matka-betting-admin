import React, { useState } from "react";

function Games() {
    const markets = [
        { id: 101, name: "Stock Market" },
        { id: 102, name: "Forex Market" },
        { id: 103, name: "Crypto Market" },
        { id: 104, name: "Commodity Market" },
    ];

    const gameTypes = [
        "Single Digit",
        "Jodi Digit",
        "Single Panna",
        "Double Panna",
        "Triple Panna",
    ];

    const [selectedMarketId, setSelectedMarketId] = useState(markets[0]?.id || 101);
    const [gamesData, setGamesData] = useState(
        markets.reduce((acc, market) => {
            acc[market.id] = gameTypes.map((game, index) => ({
                id: `${market.id}-${index + 1}`,
                marketId: market.id,
                name: game,
                result: "",
            }));
            return acc;
        }, {})
    );

    const handleResultChange = (marketId, gameId, result) => {
        setGamesData((prevGames) => ({
            ...prevGames,
            [marketId]: prevGames[marketId].map((game) =>
                game.id === gameId ? { ...game, result } : game
            ),
        }));
    };

    const currentGames = gamesData[selectedMarketId] || [];

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Games Management</h2>

            {/* Market Selection Dropdown */}
            <div className="mb-4">
                <label htmlFor="market-select" className="block text-sm font-medium text-gray-700">
                    Select Market
                </label>
                <select
                    id="market-select"
                    value={selectedMarketId}
                    onChange={(e) => setSelectedMarketId(parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                    {markets.map((market) => (
                        <option key={market.id} value={market.id}>
                            {market.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Games Table */}
            <table className="min-w-full bg-white divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Game ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Game Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Result
                        </th>
                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {currentGames.map((game) => (
                        <tr key={game.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{game.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{game.name}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={game.result}
                                        onChange={(e) =>
                                            handleResultChange(selectedMarketId, game.id, e.target.value)
                                        }
                                        className="border rounded px-2 py-1 text-sm text-gray-900 w-24 mr-2"
                                    />
                                    <button
                                        className="text-green-500 hover:text-green-600"
                                        onClick={() => alert("Result Updated Successfully")}
                                    >
                                        &#10003;
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Games;
