import { useEffect, useRef } from "react";

const CompositeOperation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      ctx.globalCompositeOperation = "lighter";
      // ctx.globalCompositeOperation = "xor";

      ctx.beginPath();
      ctx.arc(100, 50, 30, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(145, 50, 30, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(130, 75, 30, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(130, 25, 30, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.fill();
    }
  }, []);

  return (
    <div
      className="wh100"
      style={{ width: "calc(100vw - 200px)", height: "100vh" }}
    >
      <canvas
        ref={canvasRef}
        className="wh100"
        style={{ background: "#000" }}
      ></canvas>
    </div>
  );
};

export default CompositeOperation;
