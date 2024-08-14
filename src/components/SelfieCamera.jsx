import { useState, useRef, useEffect } from 'react';
import { Camera } from 'react-camera-pro';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './SelfieCamera.scss'; // Import SCSS file if you have custom styles

const SelfieCamera = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const camera = useRef(null);
  const [devices, setDevices] = useState([]);
  const [activeDeviceId, setActiveDeviceId] = useState(undefined);
  const [torchToggled, setTorchToggled] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
    };

    fetchDevices();
  }, []);

  return (
    <div className="selfie-camera-container">
      <Button variant="primary" onClick={handleShow}>
        Open Camera
      </Button>

      <Modal show={show} onHide={handleClose} fullscreen centered>
        <Modal.Header closeButton>
          <Modal.Title>Selfie Camera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="wrapper">
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
            <button
              className="take-photo-button"
              onClick={() => {
                if (camera.current) {
                  const photo = camera.current.takePhoto();
                  console.log(photo);
                  setImage(photo);
                }
              }}
            />
            {camera.current?.torchSupported && (
              <button
                className={`btn btn-primary ${torchToggled ? 'toggled' : ''}`}
                onClick={() => {
                  if (camera.current) {
                    setTorchToggled(camera.current.toggleTorch());
                  }
                }}
              >cekrek</button>
            )}
            <button
              className="btn btn-secondary"
              disabled={numberOfCameras <= 1}
              onClick={() => {
                if (camera.current) {
                  const result = camera.current.switchCamera();
                  console.log(result);
                }
              }}
            >Switch</button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SelfieCamera;
