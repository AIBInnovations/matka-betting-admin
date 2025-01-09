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
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
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
      fetchUsers();  // Refresh users list after a new addition or update
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save user.');
    }
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Phone Number</th>
                <th className="px-6 py-3 font-medium">Wallet Balance</th>
                <th className="px-6 py-3 font-medium">Bets Placed</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersData.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4">{user.walletBalance}</td>
                  <td className="px-6 py-4">{user.bets?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end mt-6">
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
