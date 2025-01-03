import React, { useState } from 'react';
import MarketFormModal from './MarketFormModal';
import ActiveMarketsTable from './ActiveMarketsTable';
import CompletedMarketsTable from './CompletedMarketsTable';
import './ToggleSwitch.css';

function Markets() {
    const [marketsData, setMarketsData] = useState([
        { id: 1, name: "Stock Market", openTime: "09:00 AM", closeTime: "04:00 PM", type: "Stock", isBettingOpen: true, isCompleted: false, result: "" },
        { id: 2, name: "Currency Market", openTime: "24/7", closeTime: "24/7", type: "Forex", isBettingOpen: false, isCompleted: false, result: "" },
        { id: 3, name: "Commodity Market", openTime: "10:00 AM", closeTime: "16:55", type: "Commodity", isBettingOpen: true, isCompleted: false, result: "" },
        { id: 4, name: "Crypto Market", openTime: "24/7", closeTime: "24/7", type: "Crypto", isBettingOpen: true, isCompleted: false, result: "" },
        { id: 5, name: "Futures Market", openTime: "09:30 AM", closeTime: "04:30 PM", type: "Futures", isBettingOpen: false, isCompleted: true, result: "Win" }
    ]);

    const [showModal, setShowModal] = useState(false);

    const handleToggleBetting = (id) => {
        setMarketsData(prevMarkets =>
            prevMarkets.map(market =>
                market.id === id ? { ...market, isBettingOpen: !market.isBettingOpen } : market
            )
        );
    };

    const handleAddMarket = (newMarket) => {
        setMarketsData(prevMarkets => [...prevMarkets, { ...newMarket, id: prevMarkets.length + 1 }]);
    };

    const handleDeleteMarket = (id) => {
        setMarketsData(prevMarkets => prevMarkets.filter(market => market.id !== id));
    };

    const handleCompleteMarket = (id) => {
        setMarketsData(prevMarkets =>
            prevMarkets.map(market =>
                market.id === id ? { ...market, isCompleted: true, isBettingOpen: false } : market
            )
        );
    };

    const handleUpdateResult = (id, result) => {
        setMarketsData(prevMarkets =>
            prevMarkets.map(market =>
                market.id === id ? { ...market, result } : market
            )
        );
    };

    const activeMarkets = marketsData.filter(market => !market.isCompleted);
    const completedMarkets = marketsData.filter(market => market.isCompleted);

    return (
        <div className="p-6 bg-white rounded-lg shadow relative">
            {/* Active Markets Table */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Market Overview</h2>
            <ActiveMarketsTable
                marketsData={activeMarkets}
                handleToggleBetting={handleToggleBetting}
                handleCompleteMarket={handleCompleteMarket}
                handleDeleteMarket={handleDeleteMarket}
                handleUpdateResult={handleUpdateResult}
            />
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded shadow"
                >
                    Add Market
                </button>
            </div>

            {/* Completed Markets Table */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Completed Markets</h2>
                <CompletedMarketsTable marketsData={completedMarkets} />
            </div>

            {showModal && <MarketFormModal onClose={() => setShowModal(false)} onSave={handleAddMarket} />}
        </div>
    );
}

export default Markets;
