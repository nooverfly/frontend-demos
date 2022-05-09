import { useEffect, useRef } from "react";
import { Graph, Path } from "@antv/x6";
import Hierarchy from "@antv/hierarchy";

// 中心主题或分支主题
Graph.registerNode(
  "topic",
  {
    inherit: "rect",
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "image",
        selector: "img",
      },
      {
        tagName: "text",
        selector: "label",
      },
    ],
    attrs: {
      body: {
        rx: 6,
        ry: 6,
        stroke: "#5F95FF",
        fill: "#EFF4FF",
        strokeWidth: 1,
      },
      img: {
        ref: "body",
        refX: "0%",
        refY: "50%",
        refY2: -8,
        width: 16,
        height: 16,
        "xlink:href":
          "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SYCuQ6HHs5cAAAAAAAAAAAAAARQnAQ",
        event: "add:topic",
        class: "topic-image",
      },
      label: {
        fontSize: 14,
        fill: "#262626",
      },
    },
  },
  true
);

Graph.registerNode(
  "topic-child",
  {
    inherit: "rect",
    markup: [
      {
        tagName: "rect",
        selector: "body",
      },
      {
        tagName: "text",
        selector: "label",
      },
      {
        tagName: "path",
        selector: "line",
      },
    ],
    attrs: {
      body: {
        fill: "#EFF4FF",
        strokeWidth: 0,
        stroke: "#5F95FF",
      },
      label: {
        fontSize: 14,
        fill: "#262626",
        textVerticalAnchor: "bottom",
      },
      line: {
        stroke: "#5F95FF",
        strokeWidth: 2,
        d: "M 0 15 L 60 15",
      },
    },
  },
  true
);

Graph.registerConnector(
  "mindmap",
  (sourcePoint, targetPoint, routerPoints, options) => {
    const midX = sourcePoint.x + 10;
    const midY = sourcePoint.y;
    const ctrX = (targetPoint.x - midX) / 5 + midX;
    const ctrY = targetPoint.y;
    const pathData = `
     M ${sourcePoint.x} ${sourcePoint.y}
     L ${midX} ${midY}
     Q ${ctrX} ${ctrY} ${targetPoint.x} ${targetPoint.y}
    `;
    return options.raw ? Path.parse(pathData) : pathData;
  },
  true
);

Graph.registerEdge(
  "mindmap-edge",
  {
    inherit: "edge",
    connector: {
      name: "mindmap",
    },
    attrs: {
      line: {
        targetMarker: "",
        stroke: "#A2B1C3",
        strokeWidth: 2,
      },
    },
    zIndex: 0,
  },
  true
);

const data: any = {
  id: "1",
  type: "topic",
  label: "中心主题",
  width: 160,
  height: 50,
  children: [
    {
      id: "1-1",
      type: "topic-branch",
      label: "分支主题1",
      width: 100,
      height: 40,
      children: [
        {
          id: "1-1-1",
          type: "topic-child",
          label: "子主题1",
          width: 60,
          height: 30,
        },
        {
          id: "1-1-2",
          type: "topic-child",
          label: "子主题2",
          width: 60,
          height: 30,
        },
      ],
    },
    {
      id: "1-2",
      type: "topic-branch",
      label: "分支主题2",
      width: 100,
      height: 40,
    },
  ],
};

const MindMapBasic = () => {
  const rootNodeRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);

  useEffect(() => {
    if (graphRef.current) {
      return;
    }

    if (rootNodeRef.current) {
      console.log("render");
      const graph = new Graph({
        container: rootNodeRef.current,
        connecting: {
          connectionPoint: "anchor",
        },
        selecting: {
          enabled: true,
        },
        width: 800,
        height: 600,
        grid: true,
      });
      graphRef.current = graph;
      const render = () => {
        const result = Hierarchy.mindmap(data, {
          direction: "H",
          getHeight(d: any) {
            return d.height;
          },
          getWidth(d: any) {
            return d.width;
          },
          getHGap() {
            return 40;
          },
          getVGap() {
            return 20;
          },
          getSide: () => {
            return "right";
          },
        });
        const cells: any[] = [];
        const traverse = (hierarchyItem: any) => {
          if (hierarchyItem) {
            const { data, children } = hierarchyItem;
            cells.push(
              graph.createNode({
                id: data.id,
                shape: data.type === "topic-child" ? "topic-child" : "topic",
                x: hierarchyItem.x,
                y: hierarchyItem.y,
                width: data.width,
                height: data.height,
                label: data.label,
                type: data.type,
              })
            );
            if (children) {
              children.forEach((item: any) => {
                const { id, data } = item;
                cells.push(
                  graph.createEdge({
                    shape: "mindmap-edge",
                    source: {
                      cell: hierarchyItem.id,
                      anchor:
                        data.type === "topic-child"
                          ? {
                              name: "right",
                              args: {
                                dx: -16,
                              },
                            }
                          : {
                              name: "center",
                              args: {
                                dx: "25%",
                              },
                            },
                    },
                    target: {
                      cell: id,
                      anchor: {
                        name: "left",
                      },
                    },
                  })
                );
                traverse(item);
              });
            }
          }
        };
        traverse(result);
        graph.resetCells(cells);
        graph.centerContent();
      };

      const findItem = (obj: any, id: any): any => {
        if (obj.id === id) {
          return {
            parent: null,
            node: obj,
          };
        }
        const { children } = obj;
        if (children) {
          for (let i = 0, len = children.length; i < len; i++) {
            const res = findItem(children[i], id);
            if (res) {
              return {
                parent: res.parent || obj,
                node: res.node,
              };
            }
          }
        }
        return null;
      };

      const addChildNode = (id: string, type: any) => {
        const res = findItem(data, id);
        const dataItem = res?.node;
        if (dataItem) {
          let item: any = null;
          const length = dataItem.children ? dataItem.children.length : 0;
          if (type === "topic") {
            item = {
              id: `${id}-${length + 1}`,
              type: "topic-branch",
              label: `分支主题${length + 1}`,
              width: 100,
              height: 40,
            };
          } else if (type === "topic-branch") {
            item = {
              id: `${id}-${length + 1}`,
              type: "topic-child",
              label: `子主题${length + 1}`,
              width: 60,
              height: 30,
            };
          }
          if (item) {
            if (dataItem.children) {
              dataItem.children.push(item);
            } else {
              dataItem.children = [item];
            }
            return item;
          }
        }
        return null;
      };

      const removeNode = (id: string) => {
        const res = findItem(data, id);
        const dataItem = res?.parent;
        if (dataItem && dataItem.children) {
          const { children } = dataItem;
          const index = children.findIndex((item: any) => item.id === id);
          return children.splice(index, 1);
        }
        return null;
      };

      graph.on("add:topic", ({ node }: any) => {
        const { id } = node;
        const type = node.prop("type");
        if (addChildNode(id, type)) {
          render();
        }
      });
      graph.bindKey(["backspace", "delete"], () => {
        const selectedNodes = graph
          .getSelectedCells()
          .filter((item) => item.isNode());
        if (selectedNodes.length) {
          const { id } = selectedNodes[0];
          if (removeNode(id)) {
            render();
          }
        }
      });

      graph.bindKey("tab", (e) => {
        e.preventDefault();
        const selectedNodes = graph
          .getSelectedCells()
          .filter((item) => item.isNode());
        if (selectedNodes.length) {
          const node = selectedNodes[0];
          const type = node.prop("type");
          if (addChildNode(node.id, type)) {
            render();
          }
        }
      });

      render();
    }
  }, []);

  return <div ref={rootNodeRef}></div>;
};

export default MindMapBasic;
