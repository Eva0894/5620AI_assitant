import React from 'react';

function ChildDashboard() {
    const titleStyle = {
        fontSize: '50px',
        color: '#333',
    };

    const dashboardStyle = {
        display: 'flex',
        flexDirection: 'column',    
        justifyContent: 'center',   
        alignItems: 'center',      
        height: '100vh',      
        padding: '40px 20px',  
        backgroundColor: '#f0f8ff',
    };

    return (
        <div style={dashboardStyle}>
            <h2 style={titleStyle}>Dashboard</h2>

        </div>
    )

}

export default ChildDashboard;
