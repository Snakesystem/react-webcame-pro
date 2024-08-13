import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './CameraPopup.scss';

const CameraPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const webcamRef = useRef(null);
  const [orientation, setOrientation] = useState('portrait');

  const handleOrientationChange = () => {
    const angle = window.screen.orientation.angle;
    setOrientation(angle === 0 || angle === 180 ? 'portrait' : 'landscape');
  };

  useEffect(() => {
    if (isOpen) {
      handleOrientationChange();
      window.addEventListener('orientationchange', handleOrientationChange);
      window.addEventListener('resize', handleOrientationChange);
      
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
    }
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
      document.exitFullscreen();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="camera-popup" ref={popupRef}>
      <div className="popup-content">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className={`webcam ${orientation}`}
        />
        <div className="controls">
          <button onClick={onClose} className="btn btn-danger">Close</button>
        </div>
      </div>
    </div>
  );
};

export default CameraPopup;
