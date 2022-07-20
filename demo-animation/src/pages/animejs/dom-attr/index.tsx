import React from "react";
import { useMount } from "@/utils/hooks";
import anime from "animejs";

const DomAttr = () => {
  useMount(() => {
    anime({
      targets: ".dom-attribute-demo input",
      value: [0, 1000],
      round: 1,
      easing: "easeInOutExpo",
    });
  });

  return (
    <div className="dom-attribute-demo">
      <input type="text" />
    </div>
  );
};

export default DomAttr;
