import React from "react";
import SplitPane from "react-split-pane";

const MySplitPane: any = SplitPane;

const BasicNested = () => {
  return (
    <div
      style={{
        width: "calc(100vw - 200px)",
        height: "100vh",
        position: "absolute",
      }}
    >
      <MySplitPane
        split="vertical"
        minSize={50}
        maxSize={300}
        defaultSize={100}
      >
        <div>min: 50px, max: 300px</div>
        <MySplitPane split="horizontal">
          <div>default min: 50px</div>
          <div>rest</div>
        </MySplitPane>
      </MySplitPane>
    </div>
  );
};

export default BasicNested;
