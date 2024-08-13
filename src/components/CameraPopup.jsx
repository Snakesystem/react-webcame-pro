import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './CameraPopup.scss';

const CameraPopup = ({ isOpen, onClose }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  if (!isOpen) return null;

  return (
    <div className="camera-popup">
      <div className="popup-content">
        {!image ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
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
