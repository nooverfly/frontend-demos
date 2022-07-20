import React from "react";
import { useMount } from "@/utils/hooks";
import { partial } from "lodash";

const FuncPartial = () => {
  useMount(() => {
    const greet = (greeting, name) => `${greeting} ${name}`;

    const sayHelloTo = partial(greet, "Hello");
    console.log(sayHelloTo("Tiga"));
    console.log(sayHelloTo("Nexus"));

    const greetFred = partial(greet, partial.placeholder, "Tiga");
    console.log(greetFred("Hello"));
    console.log(greetFred("Hi"));
  });

  return (
    <div>
      <h2>_.partial(func, [partials])</h2>
      <p>
        创建一个函数。 该函数调用 func，并传入预设的 partials 参数。
        这个方法类似_.bind，除了它不会绑定 this。
      </p>
    </div>
  );
};

export default FuncPartial;
