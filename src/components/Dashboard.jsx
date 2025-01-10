import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Users from './Users';
import Markets from './Markets';
import AddFunds from './AddFunds';
import Bets from './Bets';
import Games from './Games'; // Import the Games component
import { useLocation } from 'react-router-dom';
import Admins from './Admins';

function Dashboard() {
    const [content, setContent] = useState('Users'); // Default content
    const location = useLocation();
    const email = location.state?.email || "Unknown";
    // console.log(email)
    

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
            case 'Admins':
                return <Admins />;
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
