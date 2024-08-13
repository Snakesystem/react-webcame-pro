import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './CameraPopup.scss';

const CameraPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const enterFullscreen = () => {
    if (popupRef.current) {
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
  };

  useEffect(() => {
    if (isOpen) {
      enterFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="camera-popup" ref={popupRef}>
      <div className={`popup-content ${orientation}`}>
        {!image ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className={`webcam ${orientation}`}
          />
        ) : (
          <img src={image} alt="Captured selfie" className={`captured-image ${orientation}`} />
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
