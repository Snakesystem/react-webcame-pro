import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './CameraPopup.scss';
import { Camera } from 'react-camera-pro';

const CameraPopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const webcamRef = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [activeDeviceId, setActiveDeviceId] = useState(undefined);
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
        <Camera
          ref={webcamRef}
          aspectRatio="cover"
          facingMode="user"
          numberOfCamerasCallback={setNumberOfCameras}
          videoSourceDeviceId={activeDeviceId}
          errorMessages={{
            noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
            permissionDenied: 'Permission denied. Please refresh and give camera permission.',
            switchCamera: 'It is not possible to switch camera to different one because there is only one video device accessible.',
            canvas: 'Canvas is not supported.',
          }}
          videoReadyCallback={() => {
            console.log('Video feed ready.');
          }}
        />
        <div className="controls">
          <button onClick={onClose} className="btn btn-danger">Close</button>
        </div>
      </div>
    </div>
  );
};

export default CameraPopup;
