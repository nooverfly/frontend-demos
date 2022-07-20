import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import * as echarts from "echarts";
import "echarts-gl";

window.mapboxgl = mapboxgl;

const GLMapbox = () => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nodeRef.current) {
      const chart = echarts.init(nodeRef.current);

      fetch("/frontend-demos/demo-echarts/data/ShanghaiBuildingPrice.json")
        .then((resp) => resp.json())
        .then((linedata) => {
          chart.setOption({
            visualMap: {
              show: false,
              calculable: true,
              realtime: false,
              inRange: {
                color: [
                  "#313695",
                  "#4575b4",
                  "#74add1",
                  "#abd9e9",
                  "#e0f3f8",
                  "#ffffbf",
                  "#fee090",
                  "#fdae61",
                  "#f46d43",
                  "#d73027",
                  "#a50026",
                ],
              },
              outOfRange: {
                colorAlpha: 0,
              },
              max: linedata[1],
            },
            toolBox: {
              feature: {
                dataZoom: {
                  show: true,
                },
              },
            },
            mapbox: {
              center: [121.4693, 31.12307],
              zoom: 10,
              pitch: 50,
              bearing: -10,
              style: {
                version: 8,
                sources: {
                  "raster-tiles": {
                    attribution: "123",
                    type: "raster",
                    tiles: [
                      "https://iserver.supermap.io/iserver/services/map-china400/rest/maps/ChinaDark/zxyTileImage.png?z={z}&x={x}&y={y}",
                    ],
                    tileSize: 256,
                  },
                },
                layers: [
                  {
                    id: "simple-tiles",
                    type: "raster",
                    source: "raster-tiles",
                    minzoom: 0,
                    maxzoom: 22,
                  },
                ],
              },
              boxHeight: 50,
              // altitudeScale: 3e2,
              postEffect: {
                enable: true,
                SSAO: {
                  enable: true,
                  radius: 2,
                  intensity: 1.5,
                },
              },
              light: {
                main: {
                  intensity: 1,
                  shadow: true,
                  shadowQuality: "high",
                },
                ambient: {
                  intensity: 0,
                },
                ambientCubemap: {
                  texture:
                    "/frontend-demos/demo-echarts/data/ShanghaiBuildingPrice.hdr",
                  exposure: 1,
                  diffuseIntensity: 0.5,
                },
              },
            },

            series: [
              {
                type: "bar3D",
                roam: true,
                shading: "realistic",
                coordinateSystem: "mapbox",
                barSize: 0.2,
                silent: true,
                data: linedata[0],
              },
            ],
          });
        });
    }
  }, []);

  return <div className="full-content" ref={nodeRef}></div>;
};

export default GLMapbox;
