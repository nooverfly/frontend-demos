import React, { useCallback } from "react";
import MyAmap from "../../../components/my-amap";

const VectorPolyline = () => {
  const renderLine = useCallback((map: any, AMap: any) => {
    const path = [
      [116.362209, 39.887487],
      [116.422897, 39.878002],
      [116.372105, 39.90651],
      [116.428945, 39.89663],
    ];
    const path2 = [
      [
        [116.32873535156249, 40.01499435375046],
        [116.52099609375, 40.019201307686785],
        [116.49902343749999, 40.12849105685408],
      ],
      [
        [116.66931152343749, 40.0360265298117],
        [116.72973632812499, 40.14948820651523],
        [116.81213378906249, 40.01499435375046],
      ],
    ];

    const polyline = new AMap.Polyline({
      path: path,
      isOutline: true,
      outlineColor: "#ffeeff",
      borderWeight: 3,
      strokeColor: "#3366FF",
      strokeOpacity: 1,
      strokeWeight: 6,
      // 折线样式还支持 'dashed'
      strokeStyle: "solid",
      // strokeStyle是dashed时有效
      strokeDasharray: [10, 5],
      lineJoin: "round",
      lineCap: "round",
      zIndex: 50,
    });

    const polyline2 = new AMap.Polyline({
      path: path2,
      isOutline: true,
      outlineColor: "#ffeeff",
      borderWeight: 3,
      strokeColor: "#3366FF",
      strokeOpacity: 1,
      strokeWeight: 6,
      // 折线样式还支持 'dashed'
      strokeStyle: "dashed",
      // strokeStyle是dashed时有效
      strokeDasharray: [15, 5],
      lineJoin: "round",
      lineCap: "round",
      zIndex: 50,
    });

    map.add([polyline]);

    const layer = new AMap.VectorLayer();
    map.add(layer);
    layer.add(polyline2);

    map.setFitView();
  }, []);

  return (
    <MyAmap center={[116.395577, 39.892257]} zoom={14} render={renderLine} />
  );
};

export default VectorPolyline;
