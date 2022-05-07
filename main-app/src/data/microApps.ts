const development = [
  {
    path: "/rxjs/*",
    name: "demo-rxjs",
    baseroute: "/rxjs/",
    url: "http://localhost:4000/frontend-demos/demo-rxjs",
  },
];

const production = [
  {
    path: "/rxjs/*",
    name: "demo-rxjs",
    baseroute: "/rxjs/",
    url: "https://nooverfly.github.io/frontend-demos/demo-rxjs",
  },
];

export default process.env.NODE_ENV === "development"
  ? development
  : production;
