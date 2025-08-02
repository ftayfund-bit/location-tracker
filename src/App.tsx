import React from 'react';
import { LocationCapture } from './components/LocationCapture';

const App: React.FC = () => {
  const handleLocationCaptured = (location: any) => {
    console.log('Location captured:', location);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Location Tracker App</h1>
      <LocationCapture onLocationCaptured={handleLocationCaptured} />
    </div>
  );
};

export default App;
