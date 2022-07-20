import { drop } from "lodash";
import React from "react";
import { useMount } from "@/utils/hooks";

const ArrayDrop = () => {
  useMount(() => {
    const arr = [1, 2, 3, 4, 5, 6];
    console.log(drop(arr));
    console.log(drop(arr, 1));
    console.log(drop(arr, 2));
    console.log(drop(arr, 10));
  });

  return (
    <div>
      <h2>_.drop(array, [n=1])</h2>
      <p>创建一个切片数组，去除array前面的n个元素</p>
    </div>
  );
};

export default ArrayDrop;
