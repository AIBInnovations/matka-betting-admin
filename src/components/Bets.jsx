import React from "react";

function Bets() {
    const markets = [
        { id: 101, name: "Stock Market" },
        { id: 102, name: "Forex Market" },
        { id: 103, name: "Crypto Market" },
    ];

    const games = [
        { id: 1, name: "Single Digit" },
        { id: 2, name: "Jodi Digit" },
        { id: 3, name: "Single Panna" },
    ];

    const betsData = [
        { id: 1, user: "Alice Smith", marketId: 101, gameId: 1, amount: 100, status: "Pending", winningRatio: 2 },
        { id: 2, user: "Bob Johnson", marketId: 102, gameId: 2, amount: 200, status: "Pending", winningRatio: 3 },
        { id: 3, user: "Charlie Lee", marketId: 103, gameId: 3, amount: 150, status: "Pending", winningRatio: 1.5 },
    ];

    const completedBetsData = [
        { id: 4, user: "Emily Davis", marketId: 101, gameId: 1, amount: 120, status: "Won", winningRatio: 2 },
        { id: 5, user: "Michael Brown", marketId: 102, gameId: 2, amount: 180, status: "Lost", winningRatio: 3 },
        { id: 6, user: "Sarah Wilson", marketId: 103, gameId: 3, amount: 200, status: "Won", winningRatio: 1.5 },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow space-y-8">
            {/* Active Bets Table */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Active Bets</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-50 divide-y divide-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Market
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Game
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {betsData.map((bet) => {
                                const market = markets.find((m) => m.id === bet.marketId)?.name || "Unknown Market";
                                const game = games.find((g) => g.id === bet.gameId)?.name || "Unknown Game";

                                return (
                                    <tr key={bet.id} className="hover:bg-gray-50 transition duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {bet.user}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{market}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{game}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${bet.amount}</td>
                                        <td
                                            className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-yellow-500`}
                                        >
                                            {bet.status}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Completed Bets Table */}
            <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Completed Bets</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-50 divide-y divide-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Market
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Game
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Winning Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {completedBetsData.map((bet) => {
                                const market = markets.find((m) => m.id === bet.marketId)?.name || "Unknown Market";
                                const game = games.find((g) => g.id === bet.gameId)?.name || "Unknown Game";
                                const winningAmount =
                                    bet.status === "Won" ? bet.amount * bet.winningRatio : 0;

                                return (
                                    <tr key={bet.id} className="hover:bg-gray-50 transition duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {bet.user}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{market}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{game}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${bet.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {winningAmount > 0 ? `$${winningAmount.toFixed(2)}` : "-"}
                                        </td>
                                        <td
                                            className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                                                bet.status === "Won" ? "text-green-500" : "text-red-500"
                                            }`}
                                        >
                                            {bet.status}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Bets;
