import { useEffect, useState } from "react";

const ChildBtn = () => {
  useEffect(() => {
    console.log("========== child1-button");
    return () => {
      console.log("========== unchild-button");
    };
  });

  return <div>Button</div>;
};

const Child = ({ count }: { count: number }) => {
  useEffect(() => {
    console.log("========== child1");
    return () => {
      console.log("========== unchild1");
    };
  });

  return (
    <div>
      Child: {count}
      <ChildBtn />
    </div>
  );
};

const Scene1 = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("========== root");
    return () => {
      console.log("========== unroot");
    };
  });

  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(() => count + 1);
        }}
      >
        +
      </button>
      <Child count={count} />
    </div>
  );
};

export default function () {
  const [target, setTarget] = useState(1);

  return (
    <div>
      <button onClick={() => setTarget(target + 1)}>switch</button>
      {target === 1 ? <Scene1 /> : null}
    </div>
  );
}
