import React, { useState, useEffect } from "react";
import axios from "axios";

function AddFunds() {
    const [fundRequests, setFundRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processingRequest, setProcessingRequest] = useState(null); // State to manage loader for each transaction

    useEffect(() => {
        const fetchFundRequests = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Authentication error: No token found");
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(
                    "https://only-backend-je4j.onrender.com/api/admin/transactions",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setFundRequests(response.data.transactions || []);
                setLoading(false);
            } catch (err) {
                setError(`Error fetching fund requests: ${err.message}`);
                setLoading(false);
            }
        };

        fetchFundRequests();
    }, []);

    const handleAcceptRequest = async (transaction) => {
        const { _id, transactionId } = transaction;
        const token = localStorage.getItem("token");
        setProcessingRequest(_id); // Set loading for this transaction
        try {
            // Update transaction status
            await axios.post(
                "https://only-backend-je4j.onrender.com/api/wallet/verify",
                { transactionId, status: "approved" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Update local state to reflect approved status
            setFundRequests(
                fundRequests.map((request) =>
                    request._id === _id
                        ? { ...request, status: "approved" }
                        : request
                )
            );

            alert(`Transaction approved successfully.`);
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to process the request. Please try again."
            );
        } finally {
            setProcessingRequest(null); // Reset loading for this transaction
        }
    };

    const handleRejectRequest = async (transaction) => {
        const { _id, transactionId } = transaction;
        const token = localStorage.getItem("token");
        setProcessingRequest(_id); // Set loading for this transaction
        try {
            // Update transaction status
            await axios.post(
                "https://only-backend-je4j.onrender.com/api/wallet/verify",
                { transactionId, status: "rejected" },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Update local state to reflect rejected status
            setFundRequests(
                fundRequests.map((request) =>
                    request._id === _id
                        ? { ...request, status: "rejected" }
                        : request
                )
            );

            alert("Transaction rejected successfully.");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to reject the transaction. Please try again."
            );
        } finally {
            setProcessingRequest(null); // Reset loading for this transaction
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col gap-6 p-6">
            <div
                className="bg-white p-4 shadow rounded overflow-auto"
                style={{ maxHeight: "calc(100vh - 100px)" }}
            >
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Fund Requests
                </h3>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Receipt</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fundRequests.map((request) => (
                            <tr
                                key={request._id}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-4">{request.user.name}</td>
                                <td className="px-6 py-4">{request.user.email}</td>
                                <td className="px-6 py-4">${request.amount}</td>
                                <td
                                    className={`px-6 py-4 font-semibold ${
                                        request.status === "approved"
                                            ? "text-green-500"
                                            : request.status === "rejected"
                                            ? "text-red-500"
                                            : "text-yellow-500"
                                    }`}
                                >
                                    {request.status.charAt(0).toUpperCase() +
                                        request.status.slice(1)}
                                </td>
                                <td className="px-6 py-4">
                                    {request.receiptUrl ? (
                                        <a
                                            href={request.receiptUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            View Receipt
                                        </a>
                                    ) : (
                                        "No Receipt"
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {request.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleAcceptRequest(request)
                                                }
                                                className={`text-green-500 hover:text-green-600 text-lg mr-4 ${
                                                    processingRequest ===
                                                    request._id
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                disabled={
                                                    processingRequest ===
                                                    request._id
                                                }
                                            >
                                                {processingRequest ===
                                                request._id ? (
                                                    <span className="loader"></span>
                                                ) : (
                                                    "✔"
                                                )}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleRejectRequest(request)
                                                }
                                                className={`text-red-500 hover:text-red-600 text-lg ${
                                                    processingRequest ===
                                                    request._id
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : ""
                                                }`}
                                                disabled={
                                                    processingRequest ===
                                                    request._id
                                                }
                                            >
                                                {processingRequest ===
                                                request._id ? (
                                                    <span className="loader"></span>
                                                ) : (
                                                    "✘"
                                                )}
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AddFunds;
