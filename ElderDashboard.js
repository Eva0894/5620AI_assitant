import React from 'react';
import CommunicationPanel from './elder/CommunicationPanel';
import HealthPanel from './elder/HealthPanel';
import SchedulePanel from './elder/SchedulePanel';
import EmergencyButton from './elder/EmergencyButton';

function ElderDashboard() {
    const dashboardStyle = {
        display: 'flex',
        flexDirection: 'column',    
        justifyContent: 'center',   
        alignItems: 'center',      
        height: '100vh',      
        padding: '40px 20px',  
        backgroundColor: '#f0f8ff',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '500px',
        maxWidth: '500px',
        marginBottom: '40px',
        marginTop: '300px',
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

    const titleStyle = {
        fontSize: '50px',
        color: '#333',
    };

    return (
        <div className="dashboard" style={dashboardStyle}>
            <div style={headerStyle}>
                <h2 style={titleStyle}>Dashboard</h2>
                <EmergencyButton />
            </div>
            <div style={panelStyle}><CommunicationPanel /></div>
            <div style={panelStyle}><HealthPanel /></div>
            <div style={panelStyle}><SchedulePanel /></div>
        </div>
    );
}

export default ElderDashboard;
