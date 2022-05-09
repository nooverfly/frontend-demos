import React from "react";
import { ReactShape } from "@antv/x6-react-shape";

class MyReactNode extends React.Component<{
  node?: ReactShape;
  text?: string;
}> {
  shouldComponentUpdate() {
    const node = this.props.node;
    if (node) {
      if (node.hasChanged("data")) {
        return true;
      }
    }
    return false;
  }

  triggerBtnEnter = (e: any) => {
    console.log(e);
    // this.props.node?.trigger("btn:enter", e);
    // @ts-ignore
    this.props.node?.model?.graph.trigger("btn:enter", e);
  };

  render() {
    return (
      <div>
        <button data-event="btn:click" onMouseEnter={this.triggerBtnEnter}>
          按钮
        </button>
        {this.props.text}
      </div>
    );
  }
}

export default MyReactNode;
