import React from 'react';

const CreateEvent: React.FC = () => {
  return (
    <div className="create-event-page">
      <iframe
        src="https://staylegit.wixstudio.com/sliceremix"
        title="Event Creation Form"
        width="100%"
        height="100vh"
        frameBorder="0"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
};

export default CreateEvent;
