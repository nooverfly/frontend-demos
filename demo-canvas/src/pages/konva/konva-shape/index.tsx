import Konva from "konva";
import { useEffect, useRef } from "react";

const KonvaShape = () => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nodeRef.current) {
      const stage = new Konva.Stage({
        container: nodeRef.current,
        width: nodeRef.current.clientWidth,
        height: nodeRef.current.clientHeight,
      });

      const layer = new Konva.Layer();
      const circle = new Konva.Circle({
        x: stage.width() / 2,
        y: stage.height() / 2,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4,
      });

      layer.add(circle);
      stage.add(layer);

      layer.draw();
    }
  }, []);

  return <div className="full-content" ref={nodeRef} />;
};

export default KonvaShape;
