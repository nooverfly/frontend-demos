import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const FancyInput = (props: any, ref: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [val, setVal] = useState("123");

  useImperativeHandle(ref, () => ({
    f: () => {
      inputRef.current?.focus();
    },
    val: inputRef.current?.value,
  }));

  return (
    <input
      ref={inputRef}
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
};

const FFancyInput = forwardRef(FancyInput);

const UseImperativeHandleDemo = () => {
  const inputRef = useRef<any>(null);

  const focus = () => {
    // inputRef.current?.f();
    console.log(inputRef.current?.val);
  };

  return (
    <div>
      <FFancyInput ref={inputRef} />
      <button onClick={focus}>focus</button>
    </div>
  );
};

export default UseImperativeHandleDemo;
