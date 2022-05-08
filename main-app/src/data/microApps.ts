const development = [
  {
    path: "/rxjs/*",
    name: "demo-rxjs",
    baseroute: "/rxjs/",
    url: "http://localhost:4000/frontend-demos/demo-rxjs",
  },
  {
    path: "/antdv/*",
    name: "demo-antdv",
    baseroute: "/antdv",
    url: "http://localhost:5000/frontend-demos/demo-antdv",
  },
  {
    path: "/pages/*",
    name: "pages",
    baseroute: "/pages",
    url: "http://localhost:5500/pages/index.html",
  },
];

const production = [
  {
    path: "/rxjs/*",
    name: "demo-rxjs",
    baseroute: "/rxjs/",
    url: "https://nooverfly.github.io/frontend-demos/demo-rxjs",
  },
  {
    path: "/antdv/*",
    name: "demo-antdv",
    baseroute: "/antdv",
    url: "https://nooverfly.github.io/frontend-demos/demo-antdv",
  },
  {
    path: "/pages/*",
    name: "pages",
    baseroute: "/pages",
    url: "https://nooverfly.github.io/frontend-demos/pages/index.html",
  },
];

export default process.env.NODE_ENV === "development"
  ? development
  : production;
