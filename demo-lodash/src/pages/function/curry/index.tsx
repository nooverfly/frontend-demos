import { curry } from "lodash";
import React from "react";
import { useMount } from "@/utils/hooks";

const FuncCurry = () => {
  useMount(() => {
    const func = (a, b, c) => {
      return [a, b, c];
    };

    const curriedFunc = curry(func);
    console.log(curriedFunc(1)(2)(3));
    console.log(curriedFunc("a", "b")("c"));
    console.log(curriedFunc("x", "y", "z"));
    console.log(curriedFunc("l")(curry.placeholder, "m")("n"));
  });

  return (
    <div>
      <h2>_.curry(func, [arity=func.length])</h2>
      <p>
        创建一个函数，该函数接收 func 的参数，要么调用func返回的结果，如果 func
        所需参数已经提供，则直接返回 func
        所执行的结果。或返回一个函数，接受余下的func 参数的函数，可以使用
        func.length 强制需要累积的参数个数。
      </p>
    </div>
  );
};

export default FuncCurry;
