import { useEffect, useRef } from "react";
import { geoPath } from "d3-geo";
import { zoom, zoomTransform, zoomIdentity } from "d3-zoom";
import { create, select } from "d3-selection";
import "d3-transition";
import * as topojson from "topojson-client";
import us from "../map-basic/us.json";
import {
  AmbientLight,
  BufferGeometry,
  ExtrudeGeometry,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import transformSVGPath from "../../../utils/transformSVGPath";

const Map3D = () => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nodeRef.current) {
      const width = 975;
      const height = 610;
      const path = geoPath();

      /* const zoomed = (event: any) => {
        const { transform } = event;
        g.attr("transform", transform);
        g.attr("stroke-width", 1 / transform.k);
      }; */

      /* const zoomMap = zoom().scaleExtent([1, 8]).on("zoom", zoomed);

      const svg = create("svg").attr("viewBox", [0, 0, width, height]);

      const g = svg.append("g");

      const states = g
        .append("g")
        .attr("fill", "#444")
        .attr("cursor", "pointer")
        .selectAll("path")
        // @ts-ignore
        .data(topojson.feature(us as any, (us as any).objects.states).features)
        .join("path")
        // .on("click", clicked)
        // @ts-ignore
        .attr("d", (d: any) => {
          const res = path(d);
          console.log(res);
          return res;
        }); */

      /* g.append("path")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr(
          "d",
          path(
            topojson.mesh(
              us as any,
              (us as any).objects.states,
              (a, b) => a !== b
            )
          )
        ); */

      // @ts-ignore
      // svg.call(zoomMap);

      // nodeRef.current.appendChild(svg.node()!);
      {
        const width = nodeRef.current.clientWidth;
        const height = nodeRef.current.clientHeight;

        const camera = new PerspectiveCamera(60, width / height, 0.1, 10000);
        camera.position.set(400, 400, 400);
        camera.up.set(0, 0, 1);

        const scene = new Scene();
        const renderer = new WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.setSize(width, height);
        nodeRef.current.appendChild(renderer.domElement);

        const render = () => {
          renderer.render(scene, camera);
        };
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.addEventListener("change", render); // use only if there is no animation loop
        controls.minDistance = 1;
        controls.maxDistance = 10000;
        controls.enablePan = true;

        const ambientLight = new AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const addMesh = (root: any, color: any) => {
          const extrudeSettings = {
            depth: 20,
            bevelEnabled: false,
          };
          const d = path(root) as string;
          const paths = transformSVGPath(d);
          const simpleShapes = paths.toShapes(true);
          const geometry = new ExtrudeGeometry(simpleShapes, extrudeSettings);
          const material = new MeshPhysicalMaterial({ color });
          const mesh = new Mesh(geometry, material);
          scene.add(mesh);

          const lineMaterial = new LineBasicMaterial({
            color: 0xff0000,
            linewidth: 3,
            linecap: "round", //ignored by WebGLRenderer
            linejoin: "round", //ignored by WebGLRenderer
          });
          const shape = simpleShapes[0];
          // shape.autoClose = true;

          const points = shape.getPoints();
          // const spacedPoints = shape.getSpacedPoints(50);

          const geometryPoints = new BufferGeometry().setFromPoints(points);
          /* const geometrySpacedPoints = new BufferGeometry().setFromPoints(
            spacedPoints
          ); */

          // solid line

          let line = new Line(geometryPoints, lineMaterial);
          line.position.set(0, 0, 20);
          scene.add(line);
        };

        topojson
          .feature(us as any, (us as any).objects.states)
          // @ts-ignore
          .features.forEach((item: any) => {
            addMesh(item, "#00FFFF");
          });
        render();
      }
    }
  }, []);

  return <div ref={nodeRef} style={{ width: "100%", height: "100vh" }}></div>;
};

export default Map3D;
