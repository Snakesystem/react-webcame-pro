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
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const isUpsideDown = window.matchMedia("(orientation: upside-down)").matches;

    let style = {
      transform: 'rotate(0deg)', // Default rotation
      width: '120%',
      height: 'auto',
      transformOrigin: 'center center',
    };

    if (isUpsideDown) {
      style.transform = 'rotate(180deg)';
    } else if (!isPortrait) {
      // Landscape
      style.transform = 'rotate(90deg)';
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
