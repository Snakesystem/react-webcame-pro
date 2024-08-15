import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './CameraPopup.scss';
import { Camera } from 'react-camera-pro';

const CameraButton = () => {
  const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');

  const handleResize = () => {
    setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`d-flex justify-content-center align-items-center min-vh-100 rotate-${orientation}`}>
      <button className="btn btn-primary rounded-circle">
        <i className="bi bi-camera"></i>
      </button>
    </div>
  );
};


const CameraPopup = ({ isOpen, onClose, openCamera }) => {
  const popupRef = useRef(null);
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
  const [activeDeviceId, setActiveDeviceId] = useState(undefined);
  const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');

  const styleLanscape = {
    transform: 'rotate(0deg)',
  };

  const stylePortrait = {
    transform: 'rotate(90deg)',
  };

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
      console.log('Cleanup');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="camera-popup" ref={popupRef}>
      <div className={`popup-content ${orientation}`}>
        {
          image ? (
            <div className="">
              <img src={image} alt="Captured Image" className='fullscreen-image-preview' />
            </div>
          ) : (
            <Camera
          ref={camera}
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
          )
        }
      </div>
      <div className="controls">
          {
            image ? (
              <div className="after-capture">
                <button onClick={() => {
                  openCamera();
                  setImage(null);
                }} className="rounded-circle">
                  <i className="bi bi-x-circle"></i>
                </button>
                <button className="rounded-circle" onClick={() => {
                  if (camera.current) {
                    const photo = camera.current.takePhoto();
                    console.log(photo);
                    setImage(photo);
                  }
                }}>
                  <i className="bi bi-check-lg"></i>
                </button>
              </div>
            ) : (
              <div className="before-capture">
                <button onClick={onClose} className="rounded-circle">
                  <i className="bi bi-x-circle"></i>
                </button>
                <button className="rounded-circle" onClick={() => {
                  if (camera.current) {
                    const photo = camera.current.takePhoto();
                    console.log(photo);
                    setImage(photo);
                  }
                }}>
                  <i className="bi bi-camera"></i>
                </button>
              </div>
            )
          }

        </div>
    </div>
  );
};

export default CameraPopup;
