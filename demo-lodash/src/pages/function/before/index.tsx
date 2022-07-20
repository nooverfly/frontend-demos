import { before } from "lodash";
import React, { useCallback, useRef } from "react";

const FuncBefore = () => {
  const clickHandler = useCallback(
    before(5, (e) => {
      console.log(e);
    }),
    []
  );

  return (
    <div>
      <h2>_.before(n, func)</h2>
      <p>
        创建一个调用func的函数，通过this绑定和创建函数的参数调用func，调用次数不超过
        n 次。 之后再调用这个函数，将返回一次最后调用func的结果。
      </p>
      <button onClick={clickHandler}>按钮</button>
    </div>
  );
};

export default FuncBefore;
