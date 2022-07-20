import React, { useEffect } from "react";
import { concat } from "lodash";

const ArrayConcat = () => {
  useEffect(() => {
    const array = [1];
    // @ts-ignore
    console.log(concat(array, 2, [3], [[4]]));
  }, []);

  return (
    <div>
      <h2>concat</h2>
      <p>创建一个新数组，将array与任何数组 或 值连接在一起。</p>
    </div>
  );
};

export default ArrayConcat;
