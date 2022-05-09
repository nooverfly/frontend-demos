import { useEffect, useRef } from "react";
import { Chart } from "@antv/g2";

const data = [
  { month: "Jan", value: 51 },
  { month: "Feb", value: 91 },
  { month: "Mar", value: 34 },
  { month: "Apr", value: 47 },
  { month: "May", value: 63 },
  { month: "June", value: 58 },
  { month: "July", value: 56 },
  { month: "Aug", value: 77 },
  { month: "Sep", value: 99 },
  { month: "Oct", value: 106 },
  { month: "Nov", value: 88 },
  { month: "Dec", value: 56 },
];

const StepLine = () => {
  const nodeRef = useRef<any>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      return;
    }
    if (nodeRef.current) {
      const chart = new Chart({
        container: nodeRef.current,
        autoFit: true,
        height: 500,
      });
      chartRef.current = chart;

      chart.data(data);

      chart.scale("month", {
        range: [0, 1],
      });
      chart.scale("value", {
        nice: true,
      });

      chart.line().position("month*value").shape("hv");

      chart.render();
    }
  }, []);

  return <div ref={nodeRef} style={{ width: 500, height: 500 }} />;
};

export default StepLine;
