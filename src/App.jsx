import React, { useState } from 'react';
import CameraPopup from './components/CameraPopup';
import CameraPro from './components/CameraPro';

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = () => setIsCameraOpen(true);
  const closeCamera = () => setIsCameraOpen(false);

  return (
    <div className="App">
      <h1>Selfie Capture App</h1>
      <CameraPro />
    </div>
  );
}

export default App;
