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
        padding: '20px',
        backgroundColor: '#f0f8ff', 
    };

    return (
        <div className="dashboard" style={dashboardStyle}>
        <h2>Dashboard (Elder)</h2>
        <CommunicationPanel />
        <HealthPanel />
        <SchedulePanel />
        <EmergencyButton />
        </div>
    );
}

export default ElderDashboard;
