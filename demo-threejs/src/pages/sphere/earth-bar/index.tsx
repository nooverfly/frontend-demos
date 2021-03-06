import { useEffect, useRef } from "react";
import {
  WebGLRenderer,
  PerspectiveCamera,
  CylinderGeometry,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Mesh,
  Scene,
  AmbientLight,
  DirectionalLight,
  GridHelper,
  AxesHelper,
  SphereGeometry,
  Group,
  BoxGeometry,
  Matrix4,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import mapPoints from "./mapPoints";
import data from "./data";

const EarthBar = () => {
  const nodeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (nodeRef.current) {
      /* const renderer = new WebGLRenderer({
        antialias: true,
      });
      const w = nodeRef.current.clientWidth,
        h = nodeRef.current.clientHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      nodeRef.current.appendChild(renderer.domElement);

      const camera = new PerspectiveCamera(45, w / h, 0.1, 10000);
      camera.lookAt(0, 0, 0);
      camera.position.set(20, 20, 20);

      const scene = new Scene();

      const grid = new GridHelper();
      scene.add(grid);

      const axes = new AxesHelper(10);
      scene.add(axes);

      // const light = new AmbientLight(0xffffff, 1);
      // scene.add(light);

      const light2 = new DirectionalLight(0xffffff);
      light2.position.set(50, 50, 0);
      scene.add(light2);

      const geometry = new CylinderGeometry(1, 1, 3, 32);
      const material = new MeshPhongMaterial({ color: 0xffff00 });
      const cylinder = new Mesh(geometry, material);
      // cylinder.position.set(2, 2, 2);
      // cylinder.lookAt(2*1.4, 2*1.4, 0);
      cylinder.lookAt(20, 20, 0);
      cylinder.updateMatrix();
      scene.add(cylinder);

      const render = () => {
        renderer.render(scene, camera);
      };
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener("change", render); // use only if there is no animation loop
      controls.minDistance = 1;
      controls.maxDistance = 100;
      controls.enablePan = true;

      render(); */

      const globeWidth = 2000;
      const globeHeight = 961;
      const globeRadius = 100; // ????????????
      const globeSegments = 64; // ?????????????????????????????????????????????????????????

      let glRender: any; // webgl?????????
      let camera: PerspectiveCamera; // ?????????
      let earthMesh: Mesh; // ?????????Mesh
      let scene: any; // ??????????????????????????????????????????html??????body
      let meshGroup: any; // ??????mesh????????????????????????mesh???????????????????????????????????????????????????????????????div
      let controls: any; // ?????????????????????????????????????????????

      const screenRender = () => {
        // ??????
        if (resizeRendererToDisplaySize()) {
          const canvas = glRender.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        meshGroup.rotation.y += 0.001;
        glRender.render(scene, camera);
        controls.update();
        requestAnimationFrame(screenRender);
      };

      /**
       * ????????????????????????
       */
      const createMapPoints = () => {
        // ??????????????????.
        const material = new MeshBasicMaterial({
          color: "#AAA",
        });

        const sphere = [];
        for (let point of mapPoints.points) {
          // ????????????????????????2??????????????????3?????????
          const pos = convertFlatCoordsToSphereCoords(point.x, point.y);
          if (pos.x && pos.y && pos.z) {
            // ????????????
            const pingGeometry = new SphereGeometry(0.4, 5, 5);
            pingGeometry.translate(pos.x, pos.y, pos.z);
            sphere.push(pingGeometry);
          }
        }
        // ??????????????????????????????mesh??????
        const earthMapPoints = new Mesh(
          mergeBufferGeometries(sphere),
          material
        );
        meshGroup.add(earthMapPoints);
      };

      /**
       * 2d???????????????????????????3d??????
       * @param x
       * @param y
       */
      const convertFlatCoordsToSphereCoords = (x: number, y: number) => {
        // Calculate the relative 3d coordinates using Mercator projection relative to the radius of the globe.
        // Convert latitude and longitude on the 90/180 degree axis.
        let latitude = ((x - globeWidth) / globeWidth) * -180;
        let longitude = ((y - globeHeight) / globeHeight) * -90;
        latitude = (latitude * Math.PI) / 180; //(latitude / 180) * Math.PI
        longitude = (longitude * Math.PI) / 180; //(longitude / 180) * Math.PI // Calculate the projected starting point

        const radius = Math.cos(longitude) * globeRadius;
        const targetX = Math.cos(latitude) * radius;
        const targetY = Math.sin(longitude) * globeRadius;
        const targetZ = Math.sin(latitude) * radius;
        return {
          x: targetX,
          y: targetY,
          z: targetZ,
        };
      };

      // ???????????????????????????
      const convertLatLngToSphereCoords = (
        latitude: number,
        longitude: number,
        radius: number
      ) => {
        const phi = (latitude * Math.PI) / 180;
        const theta = ((longitude - 180) * Math.PI) / 180;
        const x = -(radius + -1) * Math.cos(phi) * Math.cos(theta);
        const y = (radius + -1) * Math.sin(phi);
        const z = (radius + -1) * Math.cos(phi) * Math.sin(theta);
        return {
          x,
          y,
          z,
        };
      };

      /**
       * ???????????????
       */
      const colors = [
        "#ffdfe0",
        "#ffc0c0",
        "#FF0000",
        "#ee7070",
        "#c80200",
        "#900000",
        "#510000",
        "#290000",
      ];
      const domain = [
        1000, 3000, 10000, 50000, 100000, 500000, 1000000, 1000000,
      ];

      const createBar = () => {
        if (!data || data.length === 0) return;

        let color;
        // d3?????????
        // const scale = d3.scaleLinear().domain(domain).range(colors);

        data.forEach(({ lat, lng, value: size }: any) => {
          // ??????????????????????????????????????????
          // color = scale(size);
          color = "#F00";
          const pos = convertLatLngToSphereCoords(lat, lng, globeRadius);
          if (pos.x && pos.y && pos.z) {
            // ???????????????????????????????????????
            const geometry = new BoxGeometry(2, 2, 1);
            // ???????????????Z????????????????????????
            geometry.applyMatrix4(new Matrix4().makeTranslation(0, 0, -0.5));
            const barMesh = new Mesh(
              geometry,
              new MeshBasicMaterial({
                color,
              })
            );
            // ????????????
            barMesh.position.set(pos.x, pos.y, pos.z);
            // ????????????
            barMesh.lookAt(earthMesh.position);
            // ??????????????????????????????, ???20000?????????????????????????????????????????????????????????????????????????????????
            barMesh.scale.z = Math.max(size / 20000, 0.1);
            barMesh.updateMatrix();
            meshGroup.add(barMesh);
          }
        });
      };

      const resizeRendererToDisplaySize = () => {
        // ??????????????????
        const pixelRatio = window.devicePixelRatio;
        const width = (canvas.offsetWidth * pixelRatio) | 0;
        const height = (canvas.offsetHeight * pixelRatio) | 0;

        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          glRender.setSize(width, height, false);
        }
        return needResize;
      };

      // ??????webgl?????????
      const canvas = nodeRef.current;
      glRender = new WebGLRenderer({ canvas, alpha: true });
      glRender.setSize(canvas.clientWidth, canvas.clientHeight, false);
      // ????????????
      scene = new Scene();

      // ????????????
      const fov = 45;
      const aspect = canvas.clientWidth / canvas.clientHeight;
      const near = 1;
      const far = 4000;
      camera = new PerspectiveCamera(fov, aspect, near, far);
      // camera.lookAt(-50, -50, -50);
      // camera.rotateX(Math.PI / 2);
      camera.position.z = 400;
      camera.position.y = 400;
      camera.position.x = 400;

      // ???????????????
      controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 0, 0);

      // ????????????
      meshGroup = new Group();

      scene.add(meshGroup);

      // ??????????????????
      const geometry = new SphereGeometry(
        globeRadius,
        globeSegments,
        globeSegments
      );
      // ??????????????????
      const material = new MeshBasicMaterial({
        transparent: true, // ??????????????????
        opacity: 0.5, // ?????????
        color: 0xff0000, // ??????
      });

      earthMesh = new Mesh(geometry, material);
      // earthMesh.rotateZ(Math.PI/2);
      meshGroup.add(earthMesh);
      // meshGroup.lookAt(-10, -50, 0);

      createMapPoints();
      // createBar();

      const axes = new AxesHelper(50);
      scene.add(axes);
      // ????????????
      screenRender();

      canvas.addEventListener("click", (e) => {
        console.log(camera);
        console.log(meshGroup);
      });
    }
  }, []);

  return (
    <canvas
      className="wh100"
      style={{
        width: "calc(100vw - 200px)",
        height: "100vh",
        background: "#FFF",
      }}
      ref={nodeRef}
    ></canvas>
  );
};

export default EarthBar;
