import React from "react";
import { useCallback, useState } from "react";

const Child1 = ({ changeCount }: any) => {
  console.log("child render");
  return (
    <div>
      <button onClick={changeCount}>change</button>
    </div>
  );
};
const Child = React.memo(Child1, (prevProps: any, nextProps: any) => {
  return prevProps.changeCount === nextProps.changeCount;
});

const Child2 = ({ count }: any) => {
  console.log("child2 render");
  return <div>child: {count}</div>;
};

const UseCallbackDemo = () => {
  const [count, setCount] = useState(0);

  const changeCount = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  console.log("parent render");
  return (
    <div>
      <Child changeCount={changeCount} />
      <Child2 count={count} />
    </div>
  );
};

export default UseCallbackDemo;
