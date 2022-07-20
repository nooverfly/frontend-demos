import { useEffect, useRef } from "react";
import "@antv/x6-react-shape";
import { Graph } from "@antv/x6";
import MyReactNode from "./MyReactNode";
import { Provider } from "react-redux";
import store from "../../../store";

/* Graph.registerNode("my-node", {
  inherit: "react-shape",
  x: 200,
  y: 150,
  width: 150,
  height: 100,
  component: <MyReactNode />,
}); */

Graph.registerReactComponent("my-node", (node) => {
  const data = node.getData();
  return <MyReactNode text={data.text} changeContent={data.changeContent} />;
});

const data = {
  nodes: [
    {
      id: "node1",
      x: 40,
      y: 40,
      width: 80,
      height: 40,
      shape: "react-shape",
      component: "my-node",
      data: {
        text: "source",
      },
    },
    {
      id: "node2",
      x: 400,
      y: 400,
      width: 80,
      height: 40,
      label: "target",
      // shape: "react-shape",
      // component: <MyReactNode text="target" />,
    },
  ],
  edges: [
    {
      source: "node1", // String，必须，起始节点 id
      target: "node2", // String，必须，目标节点 id,
    },
  ],
};

const ReactNodeQs = () => {
  const rootNodeRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);

  useEffect(() => {
    if (graphRef.current) {
      return;
    }

    const changeContent = () => {
      console.log("content");
    };

    if (rootNodeRef.current) {
      const graph = new Graph({
        container: rootNodeRef.current,
        width: 800,
        height: 600,
        grid: true,
      });
      graphRef.current = graph;
      // graph.fromJSON(data);
      const rect = graph.addNode({
        id: "node1",
        x: 40,
        y: 40,
        width: 80,
        height: 40,
        shape: "react-shape",
        component: "my-node",
        data: {
          text: "source",
          changeContent: changeContent,
        },
      });

      graph.on("btn:click", (...rest: any) => {
        console.log(rest);
      });

      /* graph.on("node:mouseenter", ({ node, e }) => {
        console.log(node, e);
      }); */

      graph.on("btn:enter", (...rest: any) => {
        console.log(rest);
      });
    }
  }, []);

  return (
    <div ref={rootNodeRef}></div>
  );
};

export default ReactNodeQs;
