import { useEffect, useRef } from "react";
import { geoPath } from "d3-geo";
import { zoom, zoomTransform, zoomIdentity } from "d3-zoom";
import { create, select } from "d3-selection";
import "d3-transition";
import * as topojson from "topojson-client";
import us from "./us.json";

const MapBasic = () => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nodeRef.current) {
      const width = 975;
      const height = 610;
      const path = geoPath();

      const reset = () => {
        // @ts-ignore
        states.transition().style("fill", null);
        svg
          // @ts-ignore
          .transition()
          .duration(750)
          .call(
            zoomMap.transform,
            zoomIdentity,
            zoomTransform(svg.node()!).invert([width / 2, height / 2])
          );
      };

      const zoomed = (event: any) => {
        const { transform } = event;
        g.attr("transform", transform);
        g.attr("stroke-width", 1 / transform.k);
      };

      const zoomMap = zoom().scaleExtent([1, 8]).on("zoom", zoomed);

      const svg = create("svg")
        .attr("viewBox", [0, 0, width, height])
        .on("click", reset);

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
        .attr("d", path);

      states.append("title").text((d: any) => d.properties.name);

      g.append("path")
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
        );

      // @ts-ignore
      svg.call(zoomMap);

      nodeRef.current.appendChild(svg.node()!);
    }
  }, []);

  return <div ref={nodeRef}></div>;
};

export default MapBasic;
