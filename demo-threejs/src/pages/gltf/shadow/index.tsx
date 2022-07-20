import { useEffect, useRef } from "react";
import { Viewer } from "./Viewer";

const GltfShadow = () => {
  const divRef = useRef<any>(null);

  useEffect(() => {
    if (divRef.current) {
      const viewer = new Viewer(divRef.current, {});
      viewer.load(
        // "https://images.tuyacn.com/rms-static/982f0520-e242-11ec-a0c1-c9688f19b248-1654153619058.glb?tyName=%E6%A5%BC%E5%B1%82%E6%B5%8B%E8%AF%95.glb",
        "/frontend-demos/demo-three/models/CubeHouseDemo.glb",
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

export default GltfShadow;
