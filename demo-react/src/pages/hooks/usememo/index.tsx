import { useMemo, useState } from "react";
import fibonacci from "../../../utils/fibonacci";

const UseMemoDemo = () => {
  const [count, setCount] = useState(10);
  const [msg, setMsg] = useState("Hello World!");

  const fibo = useMemo(() => {
    return fibonacci(count);
  }, [count]);

  return (
    <div>
      <div>fibonacci: {fibo}</div>
      <div>msg: {msg}</div>
      <button onClick={() => setMsg("World Hello")}>change msg</button>
      <button onClick={() => setCount((c) => c + 1)}>change fibo</button>
    </div>
  );
};
export default UseMemoDemo;
