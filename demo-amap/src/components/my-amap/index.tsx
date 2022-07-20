import React, { FC, useEffect, useRef } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";

interface MapProp {
  center: [number, number];
  zoom: number;
  render: Function;
  style?: string;
}

const MyAmap: FC<MapProp> = ({ center, zoom, render, style }) => {
  const mapNodeRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef(null);
  const AMapRef = useRef(null);
  const LocaRef = useRef(null);

  useEffect(() => {
    if (mapNodeRef.current) {
      if (mapRef.current) {
        render(mapRef.current, AMapRef.current, LocaRef.current);
      } else {
        AMapLoader.load({
          key: window.mapKey!,
          version: "2.0",
          plugins: ["AMap.GeoJSON"],
          Loca: {
            version: "2.0.0",
          },
        }).then((AMap, ...rest) => {
          const Loca = window.Loca;
          LocaRef.current = Loca;
          AMapRef.current = AMap;
          const map = new AMap.Map(mapNodeRef.current, {
            center,
            zoom,
            mapStyle: style,
          });
          mapRef.current = map;
          render(map, AMap, LocaRef.current);
        });
      }
    }
  }, []);

  return <div className="full-content" ref={mapNodeRef}></div>;
};

export default MyAmap;
