import React, { useState, useRef } from 'react';
import { Camera } from 'react-camera-pro';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './SelfieCamera.scss'; // Import SCSS file if you have custom styles

const SelfieCamera = () => {
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const capturePhoto = () => {
    if (cameraRef.current) {
      const photo = cameraRef.current.takePhoto();
      setPhoto(photo);
    }
  };

  return (
    <div className="selfie-camera-container">
      <Button variant="primary" onClick={handleShow}>
        Open Camera
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Selfie Camera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="camera-container">
            <Camera ref={cameraRef} />
            <Button className="btn btn-primary mt-3" onClick={capturePhoto}>
              Capture Photo
            </Button>
            {photo && (
              <div className="photo-preview mt-3">
                <img src={photo} alt="Captured" />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SelfieCamera;
