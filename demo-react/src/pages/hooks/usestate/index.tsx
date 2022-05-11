import { Profiler, useEffect, useState } from "react";

const fibonacci = () => {
  const fib = [];

  fib[0] = 0;
  fib[1] = 1;
  for (let i = 2; i <= 10; i++) {
    // Next fibonacci number = previous + one before previous
    // Translated to JavaScript:
    fib[i] = fib[i - 2] + fib[i - 1];
  }
  console.log("运行fibonacci");
  return fib[10];
};

const UseStateDemo = () => {
  const [count, setCount] = useState(0);

  // 惰性初始state
  const [cpState, setCpState] = useState(() => {
    const i = fibonacci();
    return i;
  });
  /* const fib = fibonacci();
  const [cpState, setCpState] = useState(fib); */

  // 函数式更新: effetc依赖频繁更新
  /* useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 2000);
    return () => {
      console.log("clear");
      clearInterval(interval);
    };
  }, [count]); */

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 2000);
    return () => {
      console.log("clear");
      clearInterval(interval);
    };
  }, []);

  return (
    <Profiler id="frequencyUpdate" onRender={(...rest) => console.log(rest)}>
      <div>
        <div>统计：{count}</div>
        <div>fibonacci: {cpState}</div>
      </div>
    </Profiler>
  );
};

export default UseStateDemo;
