import React, { useEffect, useState } from "react";
import axios from "axios";

const Games = () => {
  const [markets, setMarkets] = useState([]);
  const [selectedMarketId, setSelectedMarketId] = useState("");
  const [gamesData, setGamesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMarkets = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token is missing. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          "https://only-backend-je4j.onrender.com/api/markets",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const filteredMarkets = data.filter((market) =>
          market.marketId.startsWith("MKT")
        );

        const formattedMarkets = filteredMarkets.map((market) => ({
          id: market.marketId,
          name: market.name,
          marketResult: market.results["Market Result"] || "",
          games: [
            {
              name: "Single Digit",
              result: market.results["Single Digit"] || "",
            },
            {
              name: "Jodi Digit",
              result: market.results["Jodi Digit"] || "",
            },
            {
              name: "Single Pana",
              result: market.results["Single Pana"] || "",
            },
            {
              name: "Double Pana",
              result: market.results["Double Pana"] || "",
            },
            {
              name: "Triple Pana",
              result: market.results["Triple Pana"] || "",
            },
          ],
        }));

        setMarkets(formattedMarkets);
        setSelectedMarketId(formattedMarkets[0]?.id || "");
        setGamesData(
          formattedMarkets.reduce((acc, market) => {
            acc[market.id] = market;
            return acc;
          }, {})
        );
        setLoading(false);
      } catch (err) {
        console.error("Error fetching markets:", err);
        setError("Failed to fetch markets. Please try again.");
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  const handleMarketResultUpdate = async (marketId, marketResult) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token is missing. Please log in.");
      return;
    }

    try {
      await axios.put(
        `https://only-backend-je4j.onrender.com/api/admin/markets/${marketId}/result`,
        {
          gameName: "Market Result",
          result: marketResult,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Market Result updated successfully!");
    } catch (err) {
      console.error("Error updating Market Result:", err);
      setError("Failed to update Market Result. Please try again.");
    }
  };

  const handleGameResultUpdate = async (marketId, gameName, result) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token is missing. Please log in.");
      return;
    }

    try {
      await axios.put(
        `https://only-backend-je4j.onrender.com/api/admin/markets/${marketId}/result`,
        {
          gameName,
          result,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(`${gameName} result updated successfully!`);
    } catch (err) {
      console.error(`Error updating ${gameName} result:`, err);
      setError(`Failed to update ${gameName} result. Please try again.`);
    }
  };

  const handleResultChange = (marketId, gameIndex, value) => {
    setGamesData((prevGames) => ({
      ...prevGames,
      [marketId]: {
        ...prevGames[marketId],
        games: prevGames[marketId].games.map((game, index) =>
          index === gameIndex ? { ...game, result: value } : game
        ),
      },
    }));
  };

  const currentMarket = selectedMarketId ? gamesData[selectedMarketId] : null;

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

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
          onChange={(e) => setSelectedMarketId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          {markets.map((market) => (
            <option key={market.id} value={market.id}>
              {market.name}
            </option>
          ))}
        </select>
      </div>

      {/* Market Result Input */}
      {currentMarket && (
        <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-4 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Market Result</h3>
            <input
              type="text"
              value={currentMarket.marketResult}
              onChange={(e) =>
                setGamesData((prevGames) => ({
                  ...prevGames,
                  [selectedMarketId]: {
                    ...prevGames[selectedMarketId],
                    marketResult: e.target.value,
                  },
                }))
              }
              className="w-full px-3 py-2 border rounded text-gray-900 focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="Enter Market Result"
            />
          </div>
          <button
            className="text-green-500 hover:text-green-600 ml-3"
            onClick={() =>
              handleMarketResultUpdate(selectedMarketId, currentMarket.marketResult)
            }
          >
            &#10003;
          </button>
        </div>
      )}

      {/* Games Table */}
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Game Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Result
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Update
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentMarket?.games.map((game, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{game.name}</td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  value={game.result}
                  onChange={(e) =>
                    handleResultChange(selectedMarketId, index, e.target.value)
                  }
                  className="border rounded px-2 py-1 text-sm text-gray-900 w-48"
                  placeholder="Enter result (e.g., 1,3)"
                />
              </td>
              <td className="px-6 py-4">
                <button
                  className="text-green-500 hover:text-green-600"
                  onClick={() =>
                    handleGameResultUpdate(selectedMarketId, game.name, game.result)
                  }
                >
                  &#10003;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Games;
