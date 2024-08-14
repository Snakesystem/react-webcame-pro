import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';
import SelfieCamera from './components/SelfieCamera';
import CameraPopup from './components/CameraPopup';
// import './App.scss';

const App = () => {

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
};

export default App;
