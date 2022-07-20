import { useEffect, useRef } from "react";
import * as zrender from "zrender";

const ZrenderAnimation = () => {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (nodeRef.current) {
      console.log(zrender);
      const zr = zrender.init(nodeRef.current);
      const w = zr.getWidth(),
        h = zr.getHeight();
      const r = 30;
      const circle = new zrender.Circle({
        shape: {
          cx: r,
          cy: h / 2,
          r: r,
        },
        style: {
          fill: "transparent",
          stroke: "#FF6EBE",
        },
        silent: true,
      });

      circle
        .animate("shape", true)
        .when(5000, {
          cx: w - r,
        })
        .when(10000, {
          cx: r,
        })
        .start();
      zr.add(circle);
    }
  }, []);

  return <div ref={nodeRef} className="full-content"></div>;
};

export default ZrenderAnimation;
