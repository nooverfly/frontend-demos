import { useEffect, useRef, useState } from "react";
import Child from "./Child";

const DynamicImport = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState(0);

  useEffect(() => {
    // @ts-ignore
    import("../../../utils/fibonacci").then((fibonacci) => {
      setResult(fibonacci.default(12));
    });
  }, []);

  return (
    <div>
      <div ref={divRef} style={{ width: 700, height: 300 }}>
        {result}
      </div>
      <Child />
    </div>
  );
};

export default DynamicImport;
