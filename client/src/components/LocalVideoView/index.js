import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: '150px',
    height: '150px',
    borderRadius: '8px',
    position: 'absolute',
    top: '5%',
    right: '23%',
    backgroundColor: '#000',
  },
  videoElement: {
    width: '100%',
    height: '100%',
  },
};

function LocalVideoView({ localStream }) {
  const localVideoRef = useRef();

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);

  return (
    <div style={styles.videoContainer}>
      <video style={styles.videoElement} ref={localVideoRef} autoPlay muted></video>
    </div>
  );
}

export default LocalVideoView;
