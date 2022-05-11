import { useEffect, useRef } from "react";
// import * as echarts from "echarts";

const TooltipTop = () => {
  const chartNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* if (chartNodeRef.current) {
      const chart = echarts.init(chartNodeRef.current);
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
    } */
  }, []);

  return (
    <div>
      <div className="left"></div>
      <div className="right"></div>
      <div
        style={{
          width: "calc(100vw - 200px)",
          height: "100vh",
          background: "#000",
          zIndex: 0,
        }}
        ref={chartNodeRef}
      />
    </div>
  );
};

export default TooltipTop;
