import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const MapLines = () => {
  const chartNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartNodeRef.current) {
      const chart = echarts.init(chartNodeRef.current);
      chart.showLoading();
      Promise.all([
        fetch("/sample-data/echarts/world.json").then((resp) => resp.json()),
        fetch("/sample-data/echarts/flights.json").then((resp) => resp.json()),
      ]).then(([mapData, data]): any => {
        chart.hideLoading();
        echarts.registerMap("world", mapData);
        const getAirportCoord = (idx: any) => {
          return [data.airports[idx][3], data.airports[idx][4]];
        };
        var routes = data.routes.map((airline: any) => {
          return [getAirportCoord(airline[1]), getAirportCoord(airline[2])];
        });
        routes = routes.slice(0, 1000);

        const options = {
          backgroundColor: "#003",
          geo: {
            map: "world",
            silent: true,
            roam: true,
            itemStyle: {
              borderColor: "#003",
              color: "#005",
            },
          },
          series: [
            {
              type: "lines",
              coordinateSystem: "geo",
              data: routes,
              large: false,
              // largeThreshold: 100,
              lineStyle: {
                // opacity: 0.05,
                opacity: 0.5,
                // width: 0.5,
                width: 1,
                curveness: 0.3,
                color: "#ccc",
              },
              effect: {
                constantSpeed: 20,
                show: true,
                trailLength: 0.1,
                symbol: "arrow",
                symbolSize: 10,
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "red", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "blue", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
                loop: true,
              },
              blendMode: "lighter", // 设置globalCompositeOperation为lighter
              zIndex: 1,
            },
          ],
        };

        chart.setOption(options);
      });
    }
  }, []);

  return (
    <div
      className="wh100"
      style={{
        width: "calc(100vw - 200px)",
        height: "100vh",
        background: "#000",
      }}
      ref={chartNodeRef}
    ></div>
  );
};

export default MapLines;
