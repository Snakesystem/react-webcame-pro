import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './CameraPopup.scss';

const CameraPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [videoStyle, setVideoStyle] = useState({});

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const updateVideoStyle = () => {
    const orientation = window.orientation || 0;

    let style = {
      transform: 'rotate(0deg)', // Default rotation
      width: '120%',
      height: 'auto',
    };

    if (orientation === 90 || orientation === -90) {
      // Landscape
      style.transform = 'rotate(90deg)';
    } else if (orientation === 180 || orientation === -180) {
      // Upside Down
      style.transform = 'rotate(180deg)';
    }

    setVideoStyle(style);
  };

  useEffect(() => {
    updateVideoStyle(); // Set initial style
    window.addEventListener('orientationchange', updateVideoStyle); // Update style on orientation change
    window.addEventListener('resize', updateVideoStyle); // Update style on resize

    return () => {
      window.removeEventListener('orientationchange', updateVideoStyle); // Clean up event listener
      window.removeEventListener('resize', updateVideoStyle); // Clean up event listener
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
            style={videoStyle}
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
