import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserModal from './UserModal'; // Ensure the path is correct based on your project structure

function Users() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to fetch users from the backend
    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('https://only-backend-je4j.onrender.com/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsersData(data.users);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle modal close
    const handleCloseModal = () => {
        setSelectedUser(null);
        setIsAddingUser(false);
    };

    // Handle save user (add or update)
    const handleSaveUser = async (user) => {
        try {
            const token = localStorage.getItem('token');
            if (isAddingUser) {
                // Add new user
                await axios.post(
                    'https://only-backend-je4j.onrender.com/api/admin/users',
                    user,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            } else {
                // Update existing user
                await axios.put(
                    `https://only-backend-je4j.onrender.com/api/admin/users/${user._id}`,
                    user,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            }
            handleCloseModal();
            fetchUsers();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save user.');
        }
    };

    // Handle delete user
    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://only-backend-je4j.onrender.com/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('User deleted successfully.');
            fetchUsers(); // Refresh the users list after deletion
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete user.');
        }
    };

    return (
        <div className="p-8 bg-gray-50 rounded-lg shadow-lg" style={{ height: 'calc(100vh - 4rem)', overflow: 'hidden' }}>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Management</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div
                    className="overflow-hidden rounded-lg shadow"
                    style={{ height: 'calc(100% - 8rem)' }}
                >
                    <div className="overflow-y-auto" style={{ height: '100%' }}>
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Name</th>
                                    <th className="px-6 py-3 font-medium">Phone Number</th>
                                    <th className="px-6 py-3 font-medium">Wallet Balance</th>
                                    <th className="px-6 py-3 font-medium">Bets Placed</th>
                                    <th className="px-6 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {usersData.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-100">
                                        <td className="px-6 py-4">{user.name}</td>
                                        <td className="px-6 py-4">{user.phoneNumber}</td>
                                        <td className="px-6 py-4">{user.walletBalance}</td>
                                        <td className="px-6 py-4">{user.bets?.length || 0}</td>
                                        <td className="px-6 py-4 flex space-x-2">
                                            <button
                                                onClick={() => setSelectedUser(user)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="flex justify-end mt-4">
                <button
                    onClick={() => setIsAddingUser(true)}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow"
                >
                    Add User
                </button>
            </div>

            {(selectedUser || isAddingUser) && (
                <UserModal
                    user={isAddingUser ? {} : selectedUser}
                    onClose={handleCloseModal}
                    onSave={handleSaveUser}
                />
            )}
        </div>
    );
}

export default Users;
