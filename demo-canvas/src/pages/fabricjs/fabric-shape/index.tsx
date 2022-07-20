import { useEffect, useRef } from "react";
import { fabric } from "fabric";

const FabricShape = () => {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (nodeRef.current) {
      debugger;
      const canvas = new fabric.Canvas(nodeRef.current);
      const rect = new fabric.Rect({
        top: 100,
        left: 100,
        width: 60,
        height: 70,
        fill: "red",
      });
      canvas.add(rect);
    }
  }, []);

  return <canvas className="full-content" ref={nodeRef}></canvas>;
};

export default FabricShape;
