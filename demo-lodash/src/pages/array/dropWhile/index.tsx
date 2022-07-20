import React from "react";
import { useMount } from "@/utils/hooks";
import { dropWhile } from "lodash";

const ArrayDropWhile = () => {
  useMount(() => {
    const users = [
      { user: "barney", active: false },
      { user: "fred", active: false },
      { user: "pebbles", active: true },
    ];

    console.log(dropWhile(users, (o) => !o.active));
    console.log(dropWhile(users, { user: "barney", active: false }));
    console.log(dropWhile(users, ["active", false]));
    console.log(dropWhile(users, "active"));
  });

  return (
    <div>
      <h2>_.dropWhile(array, [predicate=_.identity])</h2>
      <p>
        创建一个切片数组，去除array中从起点开始到 predicate
        返回假值结束部分。predicate 会传入3个参数： (value, index, array)。
      </p>
    </div>
  );
};

export default ArrayDropWhile;
