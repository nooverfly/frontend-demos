import React, { useEffect } from "react";
import { differenceBy } from "lodash";

const ArrayDifferenceBy = () => {
  useEffect(() => {
    console.log(differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor));
    console.log(differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], "x"));
  }, []);

  return (
    <div>
      <h2>_.differenceBy(array, [values], [iteratee=_.identity])</h2>
      <p>
        类似_.difference ，除了它接受一个 iteratee （注：迭代器）， 调用array 和
        values 中的每个元素以产生比较的标准。 结果值是从第一数组中选择。iteratee
        会调用一个参数：(value)。（注：首先使用迭代器分别迭代array 和
        values中的每个元素，返回的值作为比较值）。
      </p>
    </div>
  );
};

export default ArrayDifferenceBy;
