import React, { useState } from 'react';
import CameraPopup from './components/CameraPopup';

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = () => setIsCameraOpen(true);
  const closeCamera = () => setIsCameraOpen(false);

  return (
    <div className="App">
      <h1>Selfie Capture App</h1>
      <button onClick={openCamera} className="btn btn-primary">Open Camera</button>
      <CameraPopup isOpen={isCameraOpen} onClose={closeCamera} />
    </div>
  );
}

export default App;
