import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import graph from "./data.json";

const KnowledgeMap = () => {
  const chartNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartNodeRef.current) {
      const chart = echarts.init(chartNodeRef.current);
      // chart.showLoading();
      graph.nodes.forEach(function (node: any) {
        node.label = {
          show: node.symbolSize > 30,
        };
      });
      const option: any = {
        tooltip: {},
        legend: [
          {
            // selectedMode: 'single',
            data: graph.categories.map(function (a) {
              return a.name;
            }),
          },
        ],
        animationDuration: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            name: "KnowledgeMap",
            type: "graph",
            layout: "none",
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: true,
            label: {
              position: "right",
              formatter: "{b}",
            },
            lineStyle: {
              color: "source",
              curveness: 0.3,
            },
            emphasis: {
              focus: "adjacency",
              lineStyle: {
                width: 10,
              },
            },
          },
        ],
      };
      chart.setOption(option);
    }
  }, []);

  return (
    <div
      className="wh100"
      style={{
        width: "calc(100vw - 200px)",
        height: "100vh",
        background: "#FFF",
      }}
      ref={chartNodeRef}
    ></div>
  );
};

export default KnowledgeMap;
