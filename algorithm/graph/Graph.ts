import Dictionary from "../utils/Dictionary";

class Graph {
  private vertices: (string | number)[] = [];
  private adjList: Dictionary<string | number, (string | number)[]> =
    new Dictionary();

  constructor(private isDirected = false) {}

  addVertex(v: string | number) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  addEdge(a: string | number, b: string | number) {
    if (!this.adjList.get(a)) {
      this.addVertex(a);
    }

    if (!this.adjList.get(b)) {
      this.addVertex(b);
    }

    this.adjList.get(a)?.push(b);

    if (!this.isDirected) {
      this.adjList.get(b)?.push(a);
    }
  }

  getVertices() {
    return this.vertices;
  }

  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = "";
    for (let i = 0; i < this.vertices.length; i++) {
      s += this.vertices[i] + " -> ";
      const neighbors = this.adjList.get(this.vertices[i])!;
      for (let j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + " ";
      }
      s += "\n";
    }
    return s;
  }
}

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

console.log(graph.toString()); */

export default Graph;
