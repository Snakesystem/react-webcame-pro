import React, { useState } from 'react';
import CameraPopup from './components/CameraPopup';
import Camera from './gemini/Camera';

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = () => setIsCameraOpen(true);
  const closeCamera = () => setIsCameraOpen(false);

  return (
    <div className="App">
      <h1>Selfie Capture App</h1>
      {/* <button onClick={takeScreenshot}>Capture</button> */}
      <Camera/>
    </div>
  );
}

export default App;
