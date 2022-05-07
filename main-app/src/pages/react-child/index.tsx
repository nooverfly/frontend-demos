const ReactChild = ({ name, url, baseroute }: any) => {
  return (
    <micro-app
      style={{ height: "100vh" }}
      name={name}
      url={url}
      baseroute={baseroute}
    ></micro-app>
  );
};

export default ReactChild;
