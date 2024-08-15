import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';
import SelfieCamera from './components/SelfieCamera';
import CameraPopup from './components/CameraPopup';
// import './App.scss';

// eslint-disable-next-line react-refresh/only-export-components
export function useCheckOrientation() {

  const isLandscape = () => window.matchMedia('(orientation:landscape)').matches,
  [orientation, setOrientation] = useState(isLandscape() ? 'landscape' : 'portrait'),
  onWindowResize = () => {              
            clearTimeout(window.resizeLag)
            window.resizeLag = setTimeout(() => {
              delete window.resizeLag                       
              setOrientation(isLandscape() ? 'landscape' : 'portrait')
            }, 200)
          }

    useEffect(() => (
      onWindowResize(),
      window.addEventListener('resize', onWindowResize),
      () => window.removeEventListener('resize', onWindowResize)
    ),[setOrientation, orientation])

    return orientation;
}

const App = () => {

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = () => setIsCameraOpen(true);
  const closeCamera = () => setIsCameraOpen(false);
  
  return (
    <div className="App">
    <h1>Selfie Capture App</h1>
    <button onClick={openCamera} className="btn btn-primary">Open Camera</button>
    <CameraPopup isOpen={isCameraOpen} onClose={closeCamera} openCamera={openCamera} />
    {/* <CobaOrientasi /> */}
  </div>
  );
};

export default App;
