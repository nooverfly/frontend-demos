import React from "react";
import { useMount } from "@/utils/hooks";
import { flattenDeep } from "lodash";

const ArrayFlattenDeep = () => {
  useMount(() => {
    const arr = [1, 2, [3], [4, [5, 6, [7]]]];
    console.log(flattenDeep(arr));
  });

  return (
    <div>
      <h2>_.flattenDeep(array)</h2>
      <p>将array递归为一维数组。</p>
    </div>
  );
};

export default ArrayFlattenDeep;
