import React, { useCallback } from "react";
import MyAmap from "../../../components/my-amap";

const EpidemicPulseLine = () => {
  const renderLine = useCallback((map: any, AMap: any, Loca: any) => {
    const loca = new Loca.Container({
      map,
      blendMode: "lighter",
    });

    // 颜色配置
    const headColors = [
      "#ECFFB1",
      "#146968",
      "#146968",
      "#146968",
      "#146968",
      "#146968",
      "#146968",
      "#146968",
    ];
    const trailColors = [
      "rgba(255,178,6, 0.2)",
      "rgba(255,178,6, 0.2)",
      "rgba(20,105,104, 0.2)",
      "rgba(20,105,104, 0.2)",
      "rgba(20,105,104, 0.2)",
      "rgba(20,105,104, 0.2)",
      "rgba(20,105,104, 0.2)",
      "rgba(20,105,104, 0.2)",
    ];

    // 进入北京方向的线
    const inLineSource = new Loca.GeoJSONSource({
      url: "https://a.amap.com/Loca/static/loca-v2/demos/mock_data/data-line-in.json",
    });

    const inLinelayer = new Loca.PulseLineLayer({
      // loca,
      zIndex: 11,
      // opacity: 1,
      visible: true,
      zooms: [2, 22],
      blendMode: "lighter",
    });

    inLinelayer.setStyle({
      altitude: 0,
      lineWidth: (_: any, feature: any) =>
        feature.properties.lineWidthRatio * 4 + 1,
      // headColor: (_: any, feature: any) => headColors[feature.properties.type],
      // trailColor: (_: any, feature: any) =>
      //   trailColors[feature.properties.type],
      headColors: "#3C1FA8",
      trailColor: "#3C1FA8",
      interval: 0.5,
      duration: 2000,
    });
    inLinelayer.setSource(inLineSource);
    loca.add(inLinelayer);

    // // 下方呼吸点层
    // var scatter = new Loca.ScatterLayer({
    //   // loca,
    //   zIndex: 10,
    //   opacity: 1,
    //   visible: true,
    //   zooms: [2, 22],
    // });

    // var scatterGeo = new Loca.GeoJSONSource({
    //   url: "https://a.amap.com/Loca/static/loca-v2/demos/mock_data/data-scatter.json",
    // });
    // scatter.setSource(scatterGeo);
    // scatter.setStyle({
    //   unit: "px",
    //   size: (_, feature) => {
    //     var size = feature.properties.lineWidthRatio * 2 + 30;
    //     return [size, size];
    //   },
    //   borderWidth: 0,
    //   texture:
    //     "https://a.amap.com/Loca/static/loca-v2/demos/images/breath_yellow.png",
    //   duration: 2000,
    //   animate: true,
    // });
    // loca.add(scatter);

    loca.animate.start();
  }, []);
  return (
    <MyAmap
      center={[116.3, 39.9]}
      zoom={5}
      style="amap://styles/dark"
      render={renderLine}
    />
  );
};

export default EpidemicPulseLine;
