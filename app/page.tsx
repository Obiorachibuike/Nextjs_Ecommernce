"use client"
import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export default function Home() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [referenceSet, setReferenceSet] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (modelsLoaded) {
      startVideo();
    }
  }, [modelsLoaded]);

  const setReferenceFace = async () => {
    if (!videoRef.current) return;

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) return alert("No face detected. Please try again.");

    const labeledDescriptor = new faceapi.LabeledFaceDescriptors('Me', [detection.descriptor]);
    setFaceMatcher(new faceapi.FaceMatcher(labeledDescriptor, 0.6));
    setReferenceSet(true);
    alert("Reference face set successfully!");
  };

  const handleVideoPlay = () => {
    setInterval(async () => {
      if (!referenceSet || !videoRef.current || !canvasRef.current) return;

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceLandmarks().withFaceDescriptors();

      const canvas = canvasRef.current;
      const dims = faceapi.matchDimensions(canvas, {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
      });

      const resized = faceapi.resizeResults(detections, dims);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

      resized.forEach((result, i) => {
        const match = faceMatcher.findBestMatch(result.descriptor);
        const drawBox = new faceapi.draw.DrawBox(result.detection.box, { label: match.toString() });
        drawBox.draw(canvas);
      });
    }, 100);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Facial Recognition App</h1>
      <button onClick={setReferenceFace} disabled={!modelsLoaded} style={{ marginBottom: '10px' }}>
        Set Reference Face
      </button>
      <br />
      <video
        ref={videoRef}
        autoPlay
        muted
        width="720"
        height="560"
        onPlay={handleVideoPlay}
        style={{ border: '1px solid black' }}
      />
      <canvas ref={canvasRef} style={{ position: 'absolute' }} />
    </div>
  );
}