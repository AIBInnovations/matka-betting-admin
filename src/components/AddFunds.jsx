import React, { useState } from 'react';

function AddFunds() {
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        funds: ''
    });

    const [fundRequests, setFundRequests] = useState([
        { id: 1, name: "Alice Smith", mobileNumber: "123-456-7890", amount: 100 },
        { id: 2, name: "Bob Johnson", mobileNumber: "234-567-8901", amount: 200 },
        { id: 3, name: "Charlie Lee", mobileNumber: "345-678-9012", amount: 150 },
        { id: 4, name: "Dana Brown", mobileNumber: "456-789-0123", amount: 250 },
        { id: 5, name: "Emma Davis", mobileNumber: "567-890-1234", amount: 300 },
        { id: 6, name: "Frank Moore", mobileNumber: "678-901-2345", amount: 400 },
        { id: 7, name: "Grace Lee", mobileNumber: "789-012-56", amount: 500 },
        { id: 8, name: "Grace Lee", mobileNumber: "789-012-3456", amount: 500 }
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Adding Funds:', formData);
        alert(`Funds added to ${formData.name}'s account.`);
        setFormData({
            name: '',
            mobileNumber: '',
            funds: ''
        });
    };

    const handleAcceptRequest = (id) => {
        setFundRequests(fundRequests.filter(request => request.id !== id));
    };

    const handleRejectRequest = (id) => {
        setFundRequests(fundRequests.filter(request => request.id !== id));
    };

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="bg-white p-4 shadow rounded">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Add Funds to User Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                User Name
                            </label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                                   required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
                                Mobile Number
                            </label>
                            <input type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange}
                                   required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="funds">
                                Amount to Add ($)
                            </label>
                            <input type="number" id="funds" name="funds" value={formData.funds} onChange={handleChange}
                                   required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline text-sm">
                        Add Funds
                    </button>
                </form>
            </div>
            <div className="bg-white p-4 shadow rounded overflow-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Fund Requests</h3>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Mobile Number</th>
                            <th className="px-6 py-3">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fundRequests.map(request => (
                            <tr key={request.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{request.name}</td>
                                <td className="px-6 py-4">{request.mobileNumber}</td>
                                <td className="px-6 py-4">${request.amount}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleAcceptRequest(request.id)} className="text-green-500 hover:text-green-600 text-lg mr-4">
                                        &#10003;
                                    </button>
                                    <button onClick={() => handleRejectRequest(request.id)} className="text-red-500 hover:text-red-600 text-lg">
                                        &#10005;
                                    </button>
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
