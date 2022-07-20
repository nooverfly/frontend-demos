import React from "react";
import { useMount } from "@/utils/hooks";
import { dropRight } from "lodash";

const ArrayDropRight = () => {
  useMount(() => {
    const arr = [1, 2, 3, 4, 5, 6];
    console.log(dropRight(arr));
    console.log(dropRight(arr, 1));
    console.log(dropRight(arr, 2));
    console.log(dropRight(arr, 10));
  });

  return (
    <div>
      <h2>_.dropRight(array, [n=1])</h2>
      <p>创建一个切片数组，去除array尾部的n个元素</p>
    </div>
  );
};

export default ArrayDropRight;
