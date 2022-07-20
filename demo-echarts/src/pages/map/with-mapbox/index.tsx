import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import mapboxgl from "mapbox-gl";
import getCoordinateSysByMap from "./MapboxCoordSys";

const WithMapbox = () => {
  const domNodeRef = useRef<HTMLDivElement>(null);
  const chartNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (domNodeRef.current && chartNodeRef.current) {
      const map = new mapboxgl.Map({
        container: domNodeRef.current,
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-118.26, 34.033],
        zoom: 10,
      });
      echarts.registerCoordinateSystem(
        "tmap",
        getCoordinateSysByMap(map) as any
      );
      const myChart = echarts.init(chartNodeRef.current);
      map.on("load", () => {
        /* map.addSource("dot-point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [119.64, 29.12],
                },
              },
            ],
          },
        } as any);
        map.addLayer({
          id: "layer-with-pulsing-dot",
          type: "circle",
          source: "dot-point",
          paint: {
            "circle-color": "red",
            "circle-radius": 10,
          },
        }); */

        // fetch("/frontend-demos/demo-echarts/data/lines-bus.json")
        fetch("/frontend-demos/demo-echarts/data/RouteNumber603.json")
          .then((resp) => resp.json())
          .then((data) => {
            /* let hStep = 300 / (data.length - 1);
            let busLines = [].concat.apply(
              [],
              data.map(function (busLine: any, idx: any) {
                let prevPt = [];
                let points = [];
                for (let i = 0; i < busLine.length; i += 2) {
                  let pt = [busLine[i], busLine[i + 1]];
                  if (i > 0) {
                    pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]];
                  }
                  prevPt = pt;
                  points.push([pt[0] / 1e4, pt[1] / 1e4]);
                }
                return {
                  coords: points,
                  lineStyle: {
                    normal: {
                      color: echarts.color.modifyHSL(
                        "#5A94DF",
                        Math.round(hStep * idx)
                      ),
                    },
                  },
                };
              })
            ); */

            const { features } = data;
            let hStep = 300 / (features.length - 1);
            const busLines = features.map((obj: any, idx: number) => {
              const { geometry } = obj;
              const { paths } = geometry;
              // return paths[0];
              return {
                coords: paths[0],
                lineStyle: {
                  normal: {
                    color: echarts.color.modifyHSL(
                      "#5A94DF",
                      Math.round(hStep * idx)
                    ),
                  },
                },
              };
            });
            myChart.setOption({
              series: [
                /* {
                  type: "scatter",
                  coordinateSystem: "tmap",
                  data: [
                    {
                      name: "金华",
                      value: [119.64, 29.12, 10],
                    },
                  ],
                  symbolSize: 10,
                  encode: {
                    value: 2,
                  },
                  label: {
                    show: false,
                  },
                  emphasis: {
                    label: {
                      show: true,
                    },
                  },
                }, */
                {
                  type: "lines",
                  coordinateSystem: "tmap",
                  polyline: true,
                  data: busLines,
                  silent: true,
                  lineStyle: {
                    // color: '#c23531',
                    // color: 'rgb(200, 35, 45)',
                    opacity: 0.2,
                    width: 1,
                  },
                  progressiveThreshold: 500,
                  progressive: 200,
                },
                {
                  type: "lines",
                  coordinateSystem: "tmap",
                  polyline: true,
                  data: busLines,
                  lineStyle: {
                    width: 0,
                  },
                  effect: {
                    constantSpeed: 20,
                    show: true,
                    trailLength: 0.1,
                    symbolSize: 1.5,
                  },
                  zlevel: 1,
                },
              ],
            });
          });
      });
    }
  }, []);

  return (
    <div>
      <div
        className="wh100"
        style={{
          width: "calc(100vw - 200px)",
          height: "100vh",
          background: "#000",
        }}
        ref={domNodeRef}
      />
      <div
        className="wh100"
        style={{
          position: "absolute",
          top: 0,
          left: 200,
          width: "calc(100vw - 200px)",
          height: "100vh",
          background: "transparent",
        }}
        ref={chartNodeRef}
      ></div>
    </div>
  );
};

export default WithMapbox;
