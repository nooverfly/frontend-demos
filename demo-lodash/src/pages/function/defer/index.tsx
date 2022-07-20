import { defer } from "lodash";
import React from "react";
import { useMount } from "@/utils/hooks";

const FuncDefer = () => {
  useMount(() => {
    defer((text) => {
      console.log(text);
    }, "deferred");
  });

  return (
    <div>
      <h2>_.defer(func, [args])</h2>
      <p>
        推迟调用func，直到当前堆栈清理完毕。 调用时，任何附加的参数会传给func。
      </p>
    </div>
  );
};

export default FuncDefer;
