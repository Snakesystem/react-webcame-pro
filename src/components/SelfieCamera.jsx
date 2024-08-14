import { useEffect, useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';
// import './App.scss'; // Pastikan file SCSS diimpor

const App = () => {
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    <div className="app">
      <button className="open-modal-button" onClick={() => setShowModal(true)}>
        Open Camera
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-button" onClick={() => setShowModal(false)}>
              &times;
            </button>
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
                    className={`torch-button ${torchToggled ? 'toggled' : ''}`}
                    onClick={() => {
                      if (camera.current) {
                        setTorchToggled(camera.current.toggleTorch());
                      }
                    }}
                  />
                )}
                <button
                  className="change-facing-camera-button"
                  disabled={numberOfCameras <= 1}
                  onClick={() => {
                    if (camera.current) {
                      const result = camera.current.switchCamera();
                      console.log(result);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
