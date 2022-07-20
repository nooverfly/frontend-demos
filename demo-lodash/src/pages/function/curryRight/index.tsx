import React from "react";
import { useMount } from "@/utils/hooks";
import { curry, curryRight } from "lodash";

const FuncCurryRight = () => {
  useMount(() => {
    const abc = (a, b, c) => {
      return [a, b, c];
    };

    const curriedAbc = curryRight(abc);
    console.log(curriedAbc(1)(2)(3));
    console.log(curriedAbc(1, 2)(3));
    console.log(curriedAbc(1)(2)(3));
    console.log(curriedAbc(1)(2, curryRight.placeholder)(3));
  });

  return (
    <div>
      <h2>_.curryRight(func, [arity=func.length])</h2>
      <p>
        类似_.curry。 除了它接受参数的方式用_.partialRight 代替了_.partial。
      </p>
    </div>
  );
};

export default FuncCurryRight;
