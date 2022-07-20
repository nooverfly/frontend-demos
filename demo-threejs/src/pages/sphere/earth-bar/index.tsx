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
      const globeRadius = 100; // 球体半径
      const globeSegments = 64; // 球体面数，数量越大越光滑，性能消耗越大

      let glRender: any; // webgl渲染器
      let camera: PerspectiveCamera; // 摄像机
      let earthMesh: Mesh; // 地球的Mesh
      let scene: any; // 场景，一个大容器，可以理解为html中的body
      let meshGroup: any; // 所有mesh的容器，后面所有mesh都会放在这里面，方便我们管理，可理解为一个div
      let controls: any; // 轨道控制器，实现整体场景的控制

      const screenRender = () => {
        // 更新
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
       * 生成点状世界地图
       */
      const createMapPoints = () => {
        // 点的基本材质.
        const material = new MeshBasicMaterial({
          color: "#AAA",
        });

        const sphere = [];
        for (let point of mapPoints.points) {
          // 循环遍历所有点将2维坐标映射到3维坐标
          const pos = convertFlatCoordsToSphereCoords(point.x, point.y);
          if (pos.x && pos.y && pos.z) {
            // 生成点阵
            const pingGeometry = new SphereGeometry(0.4, 5, 5);
            pingGeometry.translate(pos.x, pos.y, pos.z);
            sphere.push(pingGeometry);
          }
        }
        // 合并所有点阵生成一个mesh对象
        const earthMapPoints = new Mesh(
          mergeBufferGeometries(sphere),
          material
        );
        meshGroup.add(earthMapPoints);
      };

      /**
       * 2d的地图坐标转为球体3d坐标
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

      // 经纬度转成球体坐标
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
       * 生成柱状图
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
        // d3比例尺
        // const scale = d3.scaleLinear().domain(domain).range(colors);

        data.forEach(({ lat, lng, value: size }: any) => {
          // 通过比例尺获取数据对应的颜色
          // color = scale(size);
          color = "#F00";
          const pos = convertLatLngToSphereCoords(lat, lng, globeRadius);
          if (pos.x && pos.y && pos.z) {
            // 我们使用立方体来生成柱状图
            const geometry = new BoxGeometry(2, 2, 1);
            // 移动立方体Z使其立在地球表面
            geometry.applyMatrix4(new Matrix4().makeTranslation(0, 0, -0.5));
            const barMesh = new Mesh(
              geometry,
              new MeshBasicMaterial({
                color,
              })
            );
            // 设置位置
            barMesh.position.set(pos.x, pos.y, pos.z);
            // 设置朝向
            barMesh.lookAt(earthMesh.position);
            // 根据数据设置柱的长度, 除20000主了为了防止柱体过长，可以根据实际情况调整，或做成参数
            barMesh.scale.z = Math.max(size / 20000, 0.1);
            barMesh.updateMatrix();
            meshGroup.add(barMesh);
          }
        });
      };

      const resizeRendererToDisplaySize = () => {
        // 兼容视网膜屏
        const pixelRatio = window.devicePixelRatio;
        const width = (canvas.offsetWidth * pixelRatio) | 0;
        const height = (canvas.offsetHeight * pixelRatio) | 0;

        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          glRender.setSize(width, height, false);
        }
        return needResize;
      };

      // 创建webgl渲染器
      const canvas = nodeRef.current;
      glRender = new WebGLRenderer({ canvas, alpha: true });
      glRender.setSize(canvas.clientWidth, canvas.clientHeight, false);
      // 创建场景
      scene = new Scene();

      // 创建相机
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

      // 轨道控制器
      controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 0, 0);

      // 创建容器
      meshGroup = new Group();

      scene.add(meshGroup);

      // 创建一个球体
      const geometry = new SphereGeometry(
        globeRadius,
        globeSegments,
        globeSegments
      );
      // 创建球体材质
      const material = new MeshBasicMaterial({
        transparent: true, // 设置是否透明
        opacity: 0.5, // 透明度
        color: 0xff0000, // 颜色
      });

      earthMesh = new Mesh(geometry, material);
      // earthMesh.rotateZ(Math.PI/2);
      meshGroup.add(earthMesh);
      // meshGroup.lookAt(-10, -50, 0);

      createMapPoints();
      // createBar();

      const axes = new AxesHelper(50);
      scene.add(axes);
      // 渲染场景
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
