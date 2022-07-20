import { flatten } from "lodash";
import React from "react";
import { useMount } from "@/utils/hooks";

const ArrayFlatten = () => {
  useMount(() => {
    const arr = [1, 2, [3], [4, [5, 6, [7]]]];
    console.log(flatten(arr));
  });

  return (
    <div>
      <h2>_.flatten(array)</h2>
      <p>减少一级array嵌套深度。</p>
    </div>
  );
};

export default ArrayFlatten;
