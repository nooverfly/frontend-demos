import React from "react";
import SplitPane from "react-split-pane";

const MySplitPane: any = SplitPane;

const BasicHorizontal = () => {
  return (
    <MySplitPane split="horizontal">
      <div>default min: 50px</div>
      <div>rest</div>
    </MySplitPane>
  );
};

export default BasicHorizontal;
