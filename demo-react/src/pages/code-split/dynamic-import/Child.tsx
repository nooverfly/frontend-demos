import { useEffect, useRef } from "react";

const Child = () => {
  const chartNode = useRef<HTMLDivElement>(null);

  return (
    <div ref={chartNode} style={{ width: 700, height: 300 }}>
      Child
    </div>
  );
};

export default Child;
