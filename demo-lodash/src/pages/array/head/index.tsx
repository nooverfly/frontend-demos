import { head } from "lodash";
import React from "react";
import { useMount } from "@/utils/hooks";

const ArrayHead = () => {
  useMount(() => {
    const arr = [1, 2, 3];
    console.log(head(arr), arr);
  });

  return (
    <div>
      <h2>_.head(array)</h2>
      <p>获取数组 array 的第一个元素。</p>
    </div>
  );
};

export default ArrayHead;
