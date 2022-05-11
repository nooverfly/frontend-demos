import { useReducer } from "react";

const reducer = (state: any, action: any) => {
  const { type } = action;
  switch (type) {
    case "increment":
      return {
        count: state.count + 1,
      };
    case "decrement":
      return {
        count: state.count - 1,
      };
  }
};

const init = (initialCount: any) => {
  return {
    count: initialCount + 3,
  };
};

const UseReducerDemo = () => {
  const [state, dispatch] = useReducer(reducer, 0, init);

  return (
    <div>
      <h1>Count: {state?.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
};

export default UseReducerDemo;
