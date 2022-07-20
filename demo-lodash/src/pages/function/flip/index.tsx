import { flip, toArray } from "lodash";
import React from "react";
import { useMount } from "@/utils/hooks";

const FuncFlip = () => {
  useMount(() => {
    const flipped = flip(function () {
      return toArray(arguments);
    });
    // @ts-ignore
    console.log(flipped(1, 2, 3, 4, 5));
  });

  return (
    <div>
      <h2>_.flip(func)</h2>
      <p>创建一个函数，调用func时候接收翻转的参数</p>
    </div>
  );
};

export default FuncFlip;
