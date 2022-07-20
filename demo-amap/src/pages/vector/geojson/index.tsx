import React, { useCallback } from "react";
import MyAmap from "../../../components/my-amap";

const VectorGeojson = () => {
  const renderLine = useCallback((map: any, AMap: any) => {
    // fetch("https://a.amap.com/jsapi_demos/static/geojson/chongqing.json")
    // fetch("http://127.0.0.1:6500/china.json")
    fetch("http://127.0.0.1:6500/allCity.json")
      .then((resp) => resp.json())
      .then((data) => {
        const geojson = new AMap.GeoJSON({
          geoJSON: data,
          // 还可以自定义getMarker和getPolyline
          getPolygon: (geojson: any, lnglats: any) => {
            // 计算面积
            var area = AMap.GeometryUtil.ringArea(lnglats[0]);
            console.log(area);

            return new AMap.Polygon({
              path: lnglats,
              fillOpacity: Math.random() / 2 + 0.2, // 面积越大透明度越高
              strokeColor: "transparent",
              fillColor: "red",
            });
          },
        });
        map.add(geojson);
      });
  }, []);
  return (
    <MyAmap center={[107.943579, 30.131735]} zoom={3} render={renderLine} />
  );
};

export default VectorGeojson;
