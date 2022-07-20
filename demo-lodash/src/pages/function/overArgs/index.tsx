import React from "react";
import { useMount } from "@/utils/hooks";
import { overArgs } from "lodash";

const FuncOverArgs = () => {
  useMount(() => {
    const double = (n) => n * 2;
    const square = (n) => n * n;

    const func = overArgs((x, y) => [x, y], [square, double]);
    console.log(func(9, 3));
    console.log(func(10, 5));
  });

  return (
    <div>
      <h2>_.overArgs(func, [transforms=[_.identity]])</h2>
      <p>创建一个函数，调用func时参数为相对应的transforms的返回值。</p>
    </div>
  );
};

export default FuncOverArgs;
