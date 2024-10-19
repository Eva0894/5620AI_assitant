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

    const panelStyle = {
        margin: '20px 0',  
        padding: '20px',    
        width: '100%',      
        maxWidth: '500px',  
        backgroundColor: '#fff',
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        textAlign: 'center',
    };


    return (
        <div style={dashboardStyle}>
            <h2 style={titleStyle}>Dashboard</h2>
            <div style={panelStyle}></div>
            <div style={panelStyle}></div>
            <div style={panelStyle}></div>
        </div>
    )

}

export default ChildDashboard;
