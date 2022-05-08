import {
  CameraEventType,
  Cartesian3,
  Cesium3DTileset,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  Viewer,
} from "cesium";
import { useEffect, useRef } from "react";

const ObliquePhotographyBasic = () => {
  const chartNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartNodeRef.current) {
      const viewer = new Viewer(chartNodeRef.current, {
        // animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        vrButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        scene3DOnly: true,
        // skyBox: false,
        // skyAtmosphere: false,
        // imageryProvider: false,
        // terrainProvider: false,
      } as any);

      viewer.scene.screenSpaceCameraController.tiltEventTypes = [
        CameraEventType.LEFT_DRAG,
      ];

      viewer.scene.screenSpaceCameraController.rotateEventTypes = [
        CameraEventType.RIGHT_DRAG,
      ];

      /* const boundingSphere = new Cesium.BoundingSphere(
        new Cesium.Cartesian3(-2773440.497039874, 4766854.675401878, 3194368.130131939),
        600,
      ) */

      // Set custom initial position
      // viewer.camera.flyToBoundingSphere(new Cesium.Cartesian3(-2773440.497039874, 4766854.675401878, 3194368.130131939), { duration: 0 })
      viewer.camera.flyTo({
        destination: new Cartesian3(
          -2773743.838695692,
          4767232.563096533,
          3195327.593747415
        ),
        duration: 10,
      });

      const tileset = viewer.scene.primitives.add(
        new Cesium3DTileset({
          url: "https://d3h9zulrmcj1j6.cloudfront.net/Orlando_Cesium/root.json",
          // url: "http://localhost:20001/tileset.json",
        })
      );

      /* viewer.entities.add({
        name: "video",
        position: Cartesian3.fromDegrees(120.19363, 30.252149, 30),
        billboard: {
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          image:
            "https://images.tuyacn.com/rms-static/d4c79580-ae4c-11ec-af62-df3a3a62f625-1648440555224.png?tyName=%E7%9B%91%E6%8E%A7%E5%B8%B8%E6%80%81.png",
        },
      }); */

      /* billboards.add({
        position: Cesium.Cartesian3.fromDegrees(120.1935, 30.252149, 30),
        image:
          "https://images.tuyacn.com/rms-static/d4c79580-ae4c-11ec-af62-df3a3a62f625-1648440555224.png?tyName=%E7%9B%91%E6%8E%A7%E5%B8%B8%E6%80%81.png",
      }); */

      /* const handlerVideo = new ScreenSpaceEventHandler(viewer.scene.canvas);
      handlerVideo.setInputAction((click: any) => {
        const position = click.position;
        const pick = viewer.scene.pick(position);
        console.log(click, pick);
      }, ScreenSpaceEventType.LEFT_CLICK); */
    }
  }, []);

  return (
    <div
      className="__wh100"
      style={{
        width: "calc(100vw - 200px)",
        height: "100vh",
        background: "#000",
      }}
      ref={chartNodeRef}
    ></div>
  );
};

export default ObliquePhotographyBasic;
