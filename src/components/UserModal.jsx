import React, { useState } from 'react';
import axios from 'axios';

function UserModal({ user, onClose, onSave }) {
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `https://only-backend-je4j.onrender.com/api/admin/users/${editedUser._id}`,
                {
                    name: editedUser.name,
                    phoneNumber: editedUser.phoneNumber,
                    email: editedUser.email,
                    walletBalance: editedUser.walletBalance
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            onSave(editedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user.');
        }
        onClose();
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                    <i className="fas fa-times text-xl"></i>
                </button>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Edit User Details</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editedUser.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={editedUser.phoneNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={editedUser.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Wallet Balance</label>
                            <input
                                type="text"
                                name="walletBalance"
                                value={editedUser.walletBalance}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Member Since</label>
                            <p className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                                {new Date(editedUser.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-1 px-3 rounded focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded focus:outline-none"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserModal;
