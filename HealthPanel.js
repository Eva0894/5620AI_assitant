import React from 'react';

function HealthPanel() {
  return (
    <div className="health-panel">
      <h3>Health Monitoring</h3>
      <p>Heart Rate: 72 bpm</p>
      <p>Steps Today: 3000</p>
      <button>Update Health Status</button>
    </div>
  );
}

export default HealthPanel;
