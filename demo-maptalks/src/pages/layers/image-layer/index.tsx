import { useEffect, useRef } from "react";
import { ImageLayer, Map } from "maptalks";

const ImageLayerDemo = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      var map = new Map(ref.current, {
        center: [120.103291, 30.273411],
        zoom: 15,
        /* baseLayer: new maptalks.TileLayer("base", {
          urlTemplate:
            "https://t1.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=ed72eed0eaf63fd84661175894b73220",
        }), */
      });
      // map.setMaxExtent()
      /*  var vectorLayer = new MapboxglLayer("tile", {
        glOptions: {
          style: "mapbox://styles/mapbox/light-v9",
        },
      });
      map.addLayer(vectorLayer); */
      var imageLayer = new ImageLayer("images", [
        {
          url: "/frontend-demos/demo-maptalks/hehuayuan.png",
          extent: [120.098961, 30.270279, 120.107786, 30.276117],
          opacity: 1,
        },
      ]);

      map.addLayer(imageLayer);
      return () => {
        map.remove();
      };
    }
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100vh" }}></div>;
};

export default ImageLayerDemo;
