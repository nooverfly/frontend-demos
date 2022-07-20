import React, { useRef } from "react";
import { PAGInit } from "libpag";
import { useMount } from "@/utils/hooks";

const PagStart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useMount(() => {
    PAGInit().then((PAG) => {
      const url = "http://localhost:6500/like.pag";
      fetch(url)
        .then((resp) => resp.arrayBuffer())
        .then(async (buffer) => {
          const pagFile = await PAG.PAGFile.load(buffer);
          const canvas = canvasRef.current;
          canvas.width = pagFile.width();
          canvas.height = pagFile.height();
          const pagView = await PAG.PAGView.init(pagFile, canvas);
          pagView.setRepeatCount(0);
          pagView.play();
        });
    });
  });

  return (
    <div className="full-content">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default PagStart;
