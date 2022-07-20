import { dropRightWhile } from "lodash";
import React from "react";
import { useMount } from "@/utils/hooks";

const ArrayDropRightWhile = () => {
  useMount(() => {
    const users = [
      { user: "barney", active: true },
      { user: "fred", active: false },
      { user: "pebbles", active: false },
      { user: "a", active: true },
      { user: "b", active: false },
    ];

    /* console.log(dropRightWhile(users, (o) => !o.active));
    console.log(dropRightWhile(users, { user: "pebbles", active: false }));
    console.log(dropRightWhile(users, ["active", false]));
    console.log(dropRightWhile(users, "active")); */
    console.log(dropRightWhile(users, (o) => !o.active));
  });

  return (
    <div>
      <h2>_.dropRightWhile(array, [predicate=_.identity])</h2>
      <p>
        创建一个切片数组，去除array中从 predicate
        返回假值开始到尾部的部分。predicate 会传入3个参数： (value, index,
        array)。
      </p>
    </div>
  );
};

export default ArrayDropRightWhile;
