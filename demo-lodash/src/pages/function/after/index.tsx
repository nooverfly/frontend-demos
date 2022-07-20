import { after } from "lodash";
import React, { useCallback } from "react";

const FuncAfter = () => {
  const clickHandler = useCallback(
    after(5, (e) => console.log(e)),
    []
  );

  return (
    <div>
      <h2>_.after(n, func)</h2>
      <p>创建一个函数，当他被调用n或更多次之后将马上触发func</p>
      <button onClick={clickHandler}>按钮</button>
    </div>
  );
};

export default FuncAfter;
