import React, { useEffect } from "react";
import { differenceWith } from "lodash";

const ArrayDifferenceWith = () => {
  useEffect(() => {
    const arr1 = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
    ];
    const filter = [
      { x: 2, y: 3 },
      { x: 3, y: 4 },
    ];

    console.log(
      differenceWith(arr1, filter, (a, b) => a.x === b.x && a.y === b.y)
    );
  }, []);

  return (
    <div>
      <h2>_.differenceWith(array, [values], [comparator])</h2>
      <p>
        类似_.difference ，除了它接受一个 comparator
        （注：比较器），它调用比较array，values中的元素。
        结果值是从第一数组中选择。comparator 调用参数有两个：(arrVal, othVal)。
      </p>
    </div>
  );
};

export default ArrayDifferenceWith;
