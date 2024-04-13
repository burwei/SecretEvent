import React, { useRef, useEffect } from 'react';

const Camera: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Request access to the camera
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const constraints: MediaStreamConstraints = {
                video: true
            };

            // Access the camera
            navigator.mediaDevices.getUserMedia(constraints)
                .then((stream) => {
                    // Attach the video stream to the video element and autoplay
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                    }
                })
                .catch((error) => {
                    console.error("Error accessing the media devices.", error);
                });
        }
    }, []);

    return <video ref={videoRef} />;
};

export default Camera;
