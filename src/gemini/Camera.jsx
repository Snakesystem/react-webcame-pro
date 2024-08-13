import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function Camera() {
  const webcamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const videoConstraints = {
    width: window.innerWidth,
    height: window.innerHeight,
    facingMode: "user"
  };

  const handleStartCamera = () => {
    setIsCameraOpen(true);
  };

  const handleStopCamera = () => {
    setIsCameraOpen(false);
  };

  return (
    <div>
      <button onClick={handleStartCamera}>Buka Kamera</button>
      {isCameraOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button onClick={handleStopCamera}>Tutup Kamera</button>
        </div>
      )}
    </div>
  );
}

export default Camera;
