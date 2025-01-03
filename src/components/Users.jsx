import React, { useState } from 'react';
import UserModal from './UserModal'; // Ensure the path is correct based on your project structure

function Users() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [usersData, setUsersData] = useState([
        { id: 1, name: "John Doe", walletBalance: "$1,000", betsPlaced: 5, phone: "123-456-7890", email: "john.doe@example.com", address: "1234 Elm Street, Somewhere, NY 10001", dateOfJoining: "2020-01-01" },
        { id: 2, name: "Jane Smith", walletBalance: "$2,500", betsPlaced: 10, phone: "987-654-3210", email: "jane.smith@example.com", address: "5678 Oak Street, Anytown, CA 90210", dateOfJoining: "2020-05-15" },
        { id: 3, name: "Alice Johnson", walletBalance: "$3,200", betsPlaced: 15, phone: "555-2368", email: "alice.johnson@example.com", address: "1357 Pine Street, Everywhere, TX 75001", dateOfJoining: "2021-03-23" },
        { id: 4, name: "Bob Brown", walletBalance: "$4,600", betsPlaced: 20, phone: "321-654-0987", email: "bob.brown@example.com", address: "2468 Maple Street, Nowhere, FL 33001", dateOfJoining: "2021-07-30" },
        { id: 5, name: "Carol Taylor", walletBalance: "$5,750", betsPlaced: 25, phone: "111-222-3333", email: "carol.taylor@example.com", address: "9876 Spruce Street, ThisTown, VA 22001", dateOfJoining: "2022-02-12" }
    ]);
    const [isAddingUser, setIsAddingUser] = useState(false);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setIsAddingUser(false);
    };

    const handleSaveUser = (user) => {
        if (isAddingUser) {
            setUsersData([...usersData, { ...user, id: usersData.length + 1 }]);
        } else {
            setUsersData(usersData.map(u => (u.id === user.id ? user : u)));
        }
    };

    return (
        <div className="p-8 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Management</h2>
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
                        {usersData.map(user => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleUserClick(user)}
                            >
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.phone}</td>
                                <td className="px-6 py-4">{user.walletBalance}</td>
                                <td className="px-6 py-4">{user.betsPlaced}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end mt-6">
                <button
                    onClick={() => setIsAddingUser(true)}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow transform transition-transform hover:scale-105"
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
