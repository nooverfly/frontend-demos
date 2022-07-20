import React from "react";
import { useMount } from "@/utils/hooks";
import { countBy } from "lodash";

const CollectionCountBy = () => {
  useMount(() => {
    const arr = [6.1, 4.2, 6.3];
    console.log(countBy(arr, Math.floor));
    const arr2 = ["one", "two", "three", "four", "five"];
    console.log(countBy(arr2, "length"));
  });

  return (
    <div>
      <h2>_.countBy(collection, [iteratee=_.identity])</h2>
      <div>
        创建一个组成对象，key（键）是经过 iteratee（迭代函数）
        执行处理collection中每个元素后返回的结果，每个key（键）对应的值是
        iteratee（迭代函数）返回该key（键）的次数
      </div>
    </div>
  );
};

export default CollectionCountBy;
