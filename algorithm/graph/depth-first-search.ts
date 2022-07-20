import Graph from "./Graph";

enum Colors {
  WHITE = 0,
  GREY = 1,
  BLACK = 2,
}

const initializeColor = (vertices: (string | number)[]) => {
  const color: any = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
};

const depthFirstSearchVisit = (
  u: string | number,
  color: any,
  adjList: any,
  callback: Function
) => {
  color[u] = Colors.GREY;
  if (callback) {
    callback(u);
  }

  const neighbors = adjList.get(u);
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      depthFirstSearchVisit(w, color, adjList, callback);
    }
  }
  color[u] = Colors.BLACK;
};

export const depthFirstSearch = (graph: Graph, callback: Function) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, adjList, callback);
    }
  }
};

const DFSVisit = (
  u: string | number,
  color: any,
  d: any,
  f: any,
  p: any,
  time: number,
  adjList: any
) => {
  color[u] = Colors.GREY;
  d[u] = ++time;
  const neighbors = adjList.get(u) || [];
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      p[w] = u;
      DFSVisit(w, color, d, f, p, time, adjList);
    }
  }
  color[u] = Colors.BLACK;
  f[u] = ++time;
};

export const DFS = (graph: Graph) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const d: any = {};
  const f: any = {};
  const p: any = {};
  const time = 0;

  for (let i = 0; i < vertices.length; i++) {
    f[vertices[i]] = 0;
    d[vertices[i]] = 0;
    p[vertices[i]] = null;
  }

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      DFSVisit(vertices[i], color, d, f, p, time, adjList);
    }
  }

  return {
    discovery: d,
    finished: f,
    predecessors: p,
  };
};

/* const graph = new Graph();
const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]; // {12}

for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

const printVertex = (value: string | number) =>
  console.log("Visited vertex: " + value); // {15}
depthFirstSearch(graph, printVertex); */
