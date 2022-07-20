import React, { useEffect } from "react";
import { compact } from "lodash";

const ArrayCompact = () => {
  useEffect(() => {
    const arr = [0, 1, false, 2, "", 3];
    console.log(compact(arr));
  }, []);

  return (
    <div>
      <h2>compact</h2>
      <p>
        创建一个新数组，包含原数组中所有的非假值元素。例如false, null,0, "",
        undefined, 和 NaN 都是被认为是“假值”。
      </p>
    </div>
  );
};

export default ArrayCompact;
