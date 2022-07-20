import React, { useRef } from "react";
import { useMount } from "@/utils/hooks";
import anime from "animejs";

const AnimeJsObj = () => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useMount(() => {
    if (nodeRef.current) {
      const battery = {
        charged: "0%",
        cycles: 120,
      };

      anime({
        targets: battery,
        charged: "100%",
        cycles: 130,
        round: 1,
        easing: "linear",
        update: () => {
          nodeRef.current.innerHTML = JSON.stringify(battery);
        },
      });
    }
  });

  return (
    <div>
      <div ref={nodeRef}></div>
    </div>
  );
};

export default AnimeJsObj;
