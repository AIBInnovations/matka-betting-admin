import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Users from './Users';
import Markets from './Markets';
import AddFunds from './AddFunds';
import Bets from './Bets';
import Games from './Games'; // Import the Games component

function Dashboard() {
    const [content, setContent] = useState('Users'); // Default content

    const handleMenuClick = (menu) => {
        setContent(menu);
    };

    const renderContent = () => {
        switch (content) {
            case 'Users':
                return <Users />;
            case 'Markets':
                return <Markets />;
            case 'Add Funds':
                return <AddFunds />;
            case 'Bets':
                return <Bets />;
            case 'Games': // Render the Games component
                return <Games />;
            default:
                return <Users />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar onMenuClick={handleMenuClick} />
            <div className="flex-1 p-10">
                {renderContent()}
            </div>
        </div>
    );
}

export default Dashboard;
