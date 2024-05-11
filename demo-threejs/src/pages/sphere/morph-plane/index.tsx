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
  PlaneBufferGeometry,
  Vector2,
  Vector3,
  Float32BufferAttribute,
  TextureLoader,
  DoubleSide,
  Clock,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SphereMorphPlane = () => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nodeRef.current) {
      const renderer = new WebGLRenderer({
        antialias: true,
      });
      const w = nodeRef.current.clientWidth,
        h = nodeRef.current.clientHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(window.devicePixelRatio || 1);
      renderer.setClearColor(0x000);
      nodeRef.current.appendChild(renderer.domElement);

      const camera = new PerspectiveCamera(45, w / h, 0.1, 10000);
      camera.lookAt(0, 0, 0);
      camera.position.set(0, 10, 20);

      const scene = new Scene();

      const planeGeom = new PlaneBufferGeometry(
        Math.PI * 5,
        Math.PI * 5,
        36,
        18
      );
      const uvs = planeGeom.attributes.uv;
      const uv = new Vector2();
      const t = new Vector3();

      const sphereFormation = [];
      for (let i = 0; i < uvs.count; i++) {
        // @ts-ignore
        uv.fromBufferAttribute(uvs, i);
        t.setFromSphericalCoords(
          2.5,
          Math.PI * (1 - uv.y),
          Math.PI * (uv.x - 0.5) * 2
        );
        sphereFormation.push(t.x, t.y, t.z);
      }

      planeGeom.morphAttributes.position = [];
      planeGeom.morphAttributes.position[0] = new Float32BufferAttribute(
        sphereFormation,
        3
      );
      const planeMat = new MeshBasicMaterial({
        map: new TextureLoader().load(
          "/frontend-demos/demo-three/imgs/uv_grid_opengl.jpg"
        ),
        // @ts-ignore
        morphTargets: true,
        side: DoubleSide,
      });
      const spherePlane = new Mesh(planeGeom, planeMat);
      scene.add(spherePlane);
      // @ts-ignore
      spherePlane.morphTargetInfluences[0] = 0;

      const controls = new OrbitControls(camera, renderer.domElement);
      // controls.addEventListener("change", render);
      controls.update();
      controls.enablePan = true;

      let timeTick = 0;
      const clock = new Clock();
      const animate = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        controls.update();
        timeTick += 0.01;
        if (timeTick >= 1) {
          timeTick = 0;
        }
        // @ts-ignore
        spherePlane.morphTargetInfluences[0] =
          Math.sin(clock.getElapsedTime()) * 0.5 + 0.5;
      };
      clock.elapsedTime = 0;
      animate();
    }
  }, []);

  return (
    <div
      className="wh100"
      style={{
        width: "calc(100vw - 200px)",
        height: "100vh",
        background: "#000",
      }}
      ref={nodeRef}
    ></div>
  );
};

export default SphereMorphPlane;
