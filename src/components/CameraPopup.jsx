import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './CameraPopup.scss';

const CameraPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const webcamRef = useRef(null);
  const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');

  const handleResize = () => {
    setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
  };

  useEffect(() => {
    if (isOpen) {
      handleResize();
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && popupRef.current) {
      if (popupRef.current.requestFullscreen) {
        popupRef.current.requestFullscreen();
      } else if (popupRef.current.mozRequestFullScreen) { // Firefox
        popupRef.current.mozRequestFullScreen();
      } else if (popupRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
        popupRef.current.webkitRequestFullscreen();
      } else if (popupRef.current.msRequestFullscreen) { // IE/Edge
        popupRef.current.msRequestFullscreen();
      }
    }
    return () => {
      document.exitFullscreen();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="camera-popup" ref={popupRef}>
      <div className={`popup-content ${orientation}`}>
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
