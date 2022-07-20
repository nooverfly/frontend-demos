import React, { useCallback } from "react";
import MyAmap from "../../../components/my-amap";

const VectorBezierCurve = () => {
  const renderLine = useCallback((map: any, AMap: any) => {
    var path = [
      //每个弧线段有两种描述方式
      [116.37, 39.91], //起点
      //第一段弧线
      [116.380298, 39.907771, 116.38, 39.9], //控制点，途经点
      //第二段弧线
      [116.385298, 39.907771, 116.4, 39.9], //控制点，途经点//弧线段有两种描述方式1
      //第三段弧线
      [
        //弧线段有两种描述方式2
        [116.392872, 39.887391], //控制点
        [116.40772, 39.909252], //控制点
        [116.41, 39.89], //途经点
      ],
      //第四段弧线
      [116.423857, 39.889498, 116.422312, 39.899639, 116.425273, 39.902273],
      //控制点，控制点，途经点，每段最多两个控制点
    ];

    var bezierCurve = new AMap.BezierCurve({
      path: path,
      isOutline: true,
      outlineColor: "#ffeeff",
      borderWeight: 3,
      strokeColor: "#3366FF",
      strokeOpacity: 1,
      strokeWeight: 6,
      // 线样式还支持 'dashed'
      strokeStyle: "solid",
      // strokeStyle是dashed时有效
      strokeDasharray: [10, 10],
      lineJoin: "round",
      lineCap: "round",
      zIndex: 50,
    });

    map.add(bezierCurve);
    map.setFitView();
  }, []);

  return (
    <MyAmap center={[116.395577, 39.892257]} zoom={14} render={renderLine} />
  );
};

export default VectorBezierCurve;
