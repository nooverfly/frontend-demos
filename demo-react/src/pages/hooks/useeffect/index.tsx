import { useEffect, useRef, useState } from "react";

const fibonacci = () => {
  const fib = [];

  fib[0] = 0;
  fib[1] = 1;
  for (let i = 2; i <= 10; i++) {
    fib[i] = fib[i - 2] + fib[i - 1];
  }
  return fib[10];
};

const UseEffectDemo = () => {
  const [msg, setMsg] = useState("Hello World");

  useEffect(() => {
    let i = 100000000;
    while (i--) {
      fibonacci();
    }
    setMsg("World Hello");
  }, []);
  /* const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nodeRef.current) {
      const chart = echarts.init(nodeRef.current);
      chart.hideLoading();
      chart.setOption({
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      });
    }
  }, []);

  return (
    <div>
      <div ref={nodeRef} style={{ width: 500, height: 400 }}>
        123456
      </div>
    </div>
  ); */

  return <div>msg: {msg}</div>;
};

export default UseEffectDemo;
