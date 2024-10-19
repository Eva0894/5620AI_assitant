import React from 'react';

function CommunicationPanel() {
  return (
    <div className="communication-panel">
      <h3>Talk to CareMate</h3>
      <textarea placeholder="Type your message here..." />
      <button>Send</button>
    </div>
  );
}

export default CommunicationPanel;
