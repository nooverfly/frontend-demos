import React from "react";
import { useMount } from "@/utils/hooks";
import { memoize, values } from "lodash";

const FuncMemoize = () => {
  useMount(() => {
    const obj = { a: 1, b: 2 };
    const other = { c: 3, d: 4 };
    const memValues = memoize(values);
    console.log(memValues(obj));
    console.log(memValues(other));

    obj.a = 2;
    console.log(memValues(obj));

    memValues.cache.set(obj, ["a", "b"]);
    console.log(memValues(obj));
    console.log(memValues(other));
  });

  return (
    <div>
      <h2>_.memoize(func, [resolver])</h2>
      <p>
        创建一个会缓存 func 结果的函数。 如果提供了 resolver ，就用 resolver
        的返回值作为 key 缓存函数的结果。 默认情况下用第一个参数作为缓存的 key。
        func 在调用时 this 会绑定在缓存函数上。
      </p>
      <p>
        缓存会暴露在缓存函数的 cache 上。 它是可以定制的，只要替换了
        _.memoize.Cache 构造函数，或实现了Map 的 delete, get, has, 和 set方法。
      </p>
    </div>
  );
};

export default FuncMemoize;
