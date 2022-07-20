import React from "react";
import { useMount } from "@/utils/hooks";
import { keyBy } from "lodash";

const CollectionKeyBy = () => {
  useMount(() => {
    const array = [
      { dir: "left", code: 97 },
      { dir: "right", code: 100 },
      { dir: "right", code: 101 },
    ];
    console.log(keyBy(array, (o) => String.fromCharCode(o.code)));
    console.log(keyBy(array, "dir"));
  });

  return (
    <div>
      <h2>_.keyBy(collection, [iteratee=_.identity])</h2>
      <p>
        创建一个对象组成， key（键） 是 collection（集合）中的每个元素经过
        iteratee（迭代函数） 处理后返回的结果。 每个
        key（键）对应的值是生成key（键）的最后一个元素。iteratee（迭代函数）调用1个参数：(value)。
      </p>
    </div>
  );
};

export default CollectionKeyBy;
