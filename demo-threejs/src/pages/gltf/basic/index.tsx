import React, { useEffect, useRef } from "react";
import { Viewer } from "./viewer";

const GltfBasic = () => {
  const divRef = useRef<any>(null);
  useEffect(() => {
    if (divRef.current) {
      const viewer = new Viewer(divRef.current, {
        kiosk: false,
        model: "",
        preset: "",
        cameraPosition: null,
      });

      viewer.load(
        "/frontend-demos/demo-three/models/school/地面+相机.glb",
        "",
        new Map()
      );
    }
  }, []);

  return (
    <div
      ref={divRef}
      className="wh100"
      style={{
        width: "calc(100vw - 200px)",
        height: "100vh",
        background: "#000",
      }}
    />
  );
};

export default GltfBasic;
