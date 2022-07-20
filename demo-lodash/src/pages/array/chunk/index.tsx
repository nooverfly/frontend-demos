import React, { useEffect } from "react";
import { chunk } from "lodash";

const ArrayChunk = () => {
  useEffect(() => {
    const arr = ["a", "b", "c", "d", "e", "f"];

    console.log(chunk(arr, 1));
    console.log(chunk(arr, 2));
    console.log(chunk(arr, 3));
    console.log(chunk(arr, 4));
  }, []);

  return (
    <div>
      <h2>chunk</h2>
      <p>
        将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。
        如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
      </p>
    </div>
  );
};

export default ArrayChunk;
