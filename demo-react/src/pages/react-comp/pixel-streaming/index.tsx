import React, { useEffect, useRef } from "react";
import PixelStreamingApp from "./PixelStreamingApp";

const PixelStreaming = () => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playerRef.current) {
      const app = new PixelStreamingApp({
        playerNode: playerRef.current,
      });
      app.load();
    }
  }, []);

  return (
    <div className="full-content">
      <div className="full-content" ref={playerRef} />
    </div>
  );
};

export default PixelStreaming;
