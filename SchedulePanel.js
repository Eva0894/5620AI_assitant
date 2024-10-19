import React from 'react';

function SchedulePanel() {
  return (
    <div className="schedule-panel">
      <h3>Today's Schedule</h3>
      <ul>
        <li>Doctor's Appointment at 2 PM</li>
        <li>Medication Reminder: 5 PM</li>
      </ul>
      <button>Mark as Done</button>
    </div>
  );
}

export default SchedulePanel;
