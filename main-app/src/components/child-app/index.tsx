/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from "@micro-zoe/micro-app/polyfill/jsx-custom-event";

const ChildApp = ({ name, url, baseroute, childData }: any) => {
  return (
    <micro-app
      style={{ height: "100vh" }}
      name={name}
      url={url}
      baseroute={baseroute}
      onDataChange={(e: any) => childData(e.detail.data, baseroute)}
    ></micro-app>
  );
};

export default ChildApp;
