import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.scss'; // Pastikan file SCSS diimpor
import { Camera } from 'react-camera-pro';

const App = () => {
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const camera = useRef(null);
  const [devices, setDevices] = useState([]);
  const [activeDeviceId, setActiveDeviceId] = useState(undefined);
  const [torchToggled, setTorchToggled] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
    };

    fetchDevices();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const handleShow = () => setShowModal(true);

  const handleFullscreen = () => {
    if (modalRef.current) {
      if (modalRef.current.requestFullscreen) {
        modalRef.current.requestFullscreen();
      } else if (modalRef.current.mozRequestFullScreen) { // Firefox
        modalRef.current.mozRequestFullScreen();
      } else if (modalRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
        modalRef.current.webkitRequestFullscreen();
      } else if (modalRef.current.msRequestFullscreen) { // IE/Edge
        modalRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="app">
      <Button variant="primary" onClick={handleShow}>
        Open Camera
      </Button>

      <Modal
        show={showModal}
        onHide={handleClose}
        dialogClassName="fullscreen-modal"
        backdrop="static"
        keyboard={false}
        ref={modalRef}
      >
        <Modal.Header closeButton>
          <Modal.Title>Camera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="camera-container">
            {showImage ? (
              <div
                className="fullscreen-image-preview"
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => setShowImage(false)}
              />
            ) : (
              <Camera
                ref={camera}
                aspectRatio="cover"
                facingMode="environment"
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
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="control">
            <select
              onChange={(event) => setActiveDeviceId(event.target.value)}
              value={activeDeviceId}
            >
              {devices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
            <div
              className="image-preview"
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setShowImage(!showImage)}
            />
            <Button
              className="take-photo-button"
              onClick={() => {
                if (camera.current) {
                  const photo = camera.current.takePhoto();
                  console.log(photo);
                  setImage(photo);
                }
              }}
            >
              Take Photo
            </Button>
            {camera.current?.torchSupported && (
              <Button
                className={`torch-button ${torchToggled ? 'toggled' : ''}`}
                onClick={() => {
                  if (camera.current) {
                    setTorchToggled(camera.current.toggleTorch());
                  }
                }}
              >
                Toggle Torch
              </Button>
            )}
            <Button
              className="change-facing-camera-button"
              disabled={numberOfCameras <= 1}
              onClick={() => {
                if (camera.current) {
                  const result = camera.current.switchCamera();
                  console.log(result);
                }
              }}
            >
              Switch Camera
            </Button>
            <Button
              className="fullscreen-button"
              onClick={handleFullscreen}
            >
              Fullscreen
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
