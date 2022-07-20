import React from "react";
import { useMount } from "@/utils/hooks";
import { flattenDepth } from "lodash";

const ArrayFlattenDepth = () => {
  useMount(() => {
    const arr = [1, 2, [3], [4, [5, 6, [7]]]];
    console.log(flattenDepth(arr, 1));
    console.log(flattenDepth(arr, 2));
    console.log(flattenDepth(arr, 3));
  });

  return (
    <div>
      <h2>_.flattenDepth(array, [depth=1])</h2>
      <p>根据 depth 递归减少 array 的嵌套层级</p>
    </div>
  );
};

export default ArrayFlattenDepth;
