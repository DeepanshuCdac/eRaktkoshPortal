import React, { useState } from "react";
import Navbar from "./navbar";

export default function ZoomContainer() {
  const [zoomLevel, setZoomLevel] = useState(1);

  const zoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  const zoomOut = () => {
    if (zoomLevel > 0.1) {
      setZoomLevel(zoomLevel - 0.1);
    }
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };
  return (
    <div
      style={{
        transform: `scale(${zoomLevel})`,
        transformOrigin: "top left",
        width: "100%",
        height: "100%",
      }}
    >
      <Navbar
        zoomLevel={zoomLevel}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        resetZoom={resetZoom}
      />
    </div>
  );
}
