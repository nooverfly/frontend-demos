import React from "react";
import { useMount } from "@/utils/hooks";
import { fill } from "lodash";

const ArrayFill = () => {
  useMount(() => {
    const arr = [1, 2, 3, 4, 5];
    fill(arr, "a");
    console.log(arr);
    fill(arr, "b", 0, 3);
    console.log(arr);
    fill(arr, "c", 1, 3);
    console.log(arr);
  });

  return (
    <div>
      <h2>_.fill(array, value, [start=0], [end=array.length])</h2>
      <p>
        使用 value 值来填充（替换） array，从start位置开始,
        到end位置结束（但不包含end位置）。
      </p>
    </div>
  );
};

export default ArrayFill;
