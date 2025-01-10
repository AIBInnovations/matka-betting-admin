import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MarketFormModal from './MarketFormModal';
import ActiveMarketsTable from './ActiveMarketsTable';
import CompletedMarketsTable from './CompletedMarketsTable';
import './ToggleSwitch.css';

function Markets() {
    const [marketsData, setMarketsData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingAdd, setLoadingAdd] = useState(false); // State to manage loading for adding markets
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMarkets();
    }, []);

    const fetchMarkets = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://only-backend-je4j.onrender.com/api/markets', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMarketsData(
                response.data.map((market) => ({
                    ...market,
                    id: market._id,
                    type: market.marketId,
                }))
            );
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleToggleSwitch = async (marketId, isBettingOpen) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `https://only-backend-je4j.onrender.com/api/admin/markets/${marketId}/toggle`,
                { isBettingOpen: !isBettingOpen },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            fetchMarkets(); // Refresh markets after toggling
        } catch (error) {
            setError("Failed to toggle market: " + error.message);
        }
    };

    const handleAddMarket = async (newMarket) => {
        setLoadingAdd(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'https://only-backend-je4j.onrender.com/api/admin/add-market',
                newMarket,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchMarkets(); // Refresh markets list after a new addition
            setShowModal(false);
        } catch (error) {
            setError('Failed to add market: ' + error.message);
        }
        setLoadingAdd(false);
    };

    if (loading) return <p>Loading markets...</p>;
    if (error) return <p>Error loading markets: {error}</p>;

    const activeMarkets = marketsData.filter((market) => market.isBettingOpen);
    const completedMarkets = marketsData.filter((market) => !market.isBettingOpen);

    return (
        <div
            className="p-8 bg-white rounded-lg shadow relative overflow-hidden"
            style={{ height: 'calc(100vh - 4rem)' }}
        >
            <div className="space-y-8">
                {/* Active Markets Section */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        Active Markets
                    </h2>
                    <div style={{ maxHeight: '30vh', overflowY: 'auto' }}>
                        <ActiveMarketsTable
                            marketsData={activeMarkets.map((market) => ({
                                ...market,
                                result: market.results['Market Result'] || 'No result yet',
                            }))}
                            onToggleMarket={handleToggleSwitch}
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={() => setShowModal(true)}
                            className={`bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded shadow ${
                                loadingAdd ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={loadingAdd}
                        >
                            {loadingAdd ? 'Adding...' : 'Add Market'}
                        </button>
                    </div>
                </div>

                {/* Completed Markets Section */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Completed Markets
                    </h2>
                    <div style={{ maxHeight: '30vh', overflowY: 'auto' }}>
                        <CompletedMarketsTable
                            marketsData={completedMarkets.map((market) => ({
                                ...market,
                                result: market.results['Market Result'] || 'No result yet',
                            }))}
                        />
                    </div>
                </div>
            </div>

            {/* Market Form Modal */}
            {showModal && (
                <MarketFormModal
                    onClose={() => setShowModal(false)}
                    onSave={handleAddMarket}
                />
            )}
        </div>
    );
}

export default Markets;
