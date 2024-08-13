import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './CameraPopup.scss';

const CameraPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [orientation, setOrientation] = useState('portrait');

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const handleOrientationChange = () => {
    const isPortrait = window.innerHeight > window.innerWidth;
    setOrientation(isPortrait ? 'portrait' : 'landscape');
  };

  useEffect(() => {
    window.addEventListener('resize', handleOrientationChange);
    handleOrientationChange(); // Set initial orientation

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (popupRef.current) {
        if (popupRef.current.requestFullscreen) {
          popupRef.current.requestFullscreen();
        } else if (popupRef.current.mozRequestFullScreen) { // Firefox
          popupRef.current.mozRequestFullScreen();
        } else if (popupRef.current.webkitRequestFullscreen) { // Chrome, Safari, Opera
          popupRef.current.webkitRequestFullscreen();
        } else if (popupRef.current.msRequestFullscreen) { // IE/Edge
          popupRef.current.msRequestFullscreen();
        }
      }
    } else {
      document.exitFullscreen();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="camera-popup" ref={popupRef}>
      <div className="popup-content">
        {!image ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
            style={{
              transform: orientation === 'landscape' ? 'rotate(45deg)' : 'rotate(45deg)',
              transformOrigin: 'center center'
            }}
          />
        ) : (
          <img src={image} alt="Captured selfie" className="captured-image" />
        )}
        <div className="controls">
          {!image ? (
            <button onClick={capture} className="btn btn-primary">Capture</button>
          ) : (
            <button onClick={() => setImage(null)} className="btn btn-secondary">Retake</button>
          )}
          <button onClick={onClose} className="btn btn-danger">Close</button>
        </div>
      </div>
    </div>
  );
};

export default CameraPopup;
