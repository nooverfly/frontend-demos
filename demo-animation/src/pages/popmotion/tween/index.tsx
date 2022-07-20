import React, { useRef } from "react";
import { useMount } from "@/utils/hooks";
import { animate } from "popmotion";

const PopmotionTween = () => {
  const ballRef = useRef<HTMLSpanElement>(null);

  useMount(() => {
    if (ballRef.current) {
      const ball = ballRef.current;
      animate({
        from: 0,
        to: 100,
        onUpdate: (latest) => ball.style.transform = `translateX(${latest}px)`
      });
    }
  });

  return (
    <div>
      <span className="ball" ref={ballRef}></span>
    </div>
  );
};

export default PopmotionTween;
