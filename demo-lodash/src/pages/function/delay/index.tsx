import { delay } from "lodash";
import React from "react";
import { useMount } from "@/utils/hooks";

const FuncDelay = () => {
  useMount(() => {
    delay(
      (text) => {
        console.log(text);
      },
      3000,
      "delay"
    );
  });

  return (
    <div>
      <h2>_.delay(func, wait, [args])</h2>
      <div>延迟 wait 毫秒后调用 func。 调用时，任何附加的参数会传给func。</div>
    </div>
  );
};

export default FuncDelay;
