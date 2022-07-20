import { filter, negate } from "lodash";
import React from "react";
import { useMount } from "@/utils/hooks";

const FuncNegate = () => {
  useMount(() => {
    const isEven = (n) => {
      return n % 2 === 0;
    };

    console.log(filter([1, 2, 3, 4, 5], negate(isEven)));
  });

  return (
    <div>
      <h2>_.negate(predicate)</h2>
      <p>
        创建一个针对断言函数 func 结果取反的函数。 func
        断言函数被调用的时候，this 绑定到创建的函数，并传入对应参数。
      </p>
    </div>
  );
};

export default FuncNegate;
