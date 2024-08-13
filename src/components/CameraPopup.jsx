import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import './CameraPopup.scss';

const CameraPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const webcamRef = useRef(null);

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

      // Handle device orientation
      const handleOrientation = () => {
        if (webcamRef.current) {
          const orientation = window.screen.orientation || window.screen.mozOrientation || window.screen.msOrientation;
          const angle = orientation ? orientation.angle : 0;

          // Apply rotation based on device orientation
          webcamRef.current.style.transform = `rotate(${angle}deg)`;
        }
      };

      handleOrientation();
      window.addEventListener('orientationchange', handleOrientation);
      window.addEventListener('resize', handleOrientation);

      return () => {
        window.removeEventListener('orientationchange', handleOrientation);
        window.removeEventListener('resize', handleOrientation);
        document.exitFullscreen();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="camera-popup" ref={popupRef}>
      <div className="popup-content">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
        />
        <div className="controls">
          <button onClick={onClose} className="btn btn-danger">Close</button>
        </div>
      </div>
    </div>
  );
};

export default CameraPopup;
