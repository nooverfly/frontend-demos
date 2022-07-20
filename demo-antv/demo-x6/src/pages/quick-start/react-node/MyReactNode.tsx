import React, { useState } from "react";
import { ReactShape } from "@antv/x6-react-shape";
import { connect, useSelector } from "react-redux";
import store from "../../../store";

/* class MyReactNode extends React.Component<{
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
} */

const MyReactNode = ({ text, changeContent, username }: any) => {
  const [content, setContent] = useState<string>(text);

  // const username = useSelector((state: any) => state.demoStore.username);

  const clickHandler = () => {
    setContent("abc");
    changeContent();
  };
  return (
    <div>
      {content}
      <button onClick={clickHandler}>按钮-{username}</button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  username: state.demoStore.username,
});

// @ts-ignore
export default connect(mapStateToProps, null, null, {
  context: store,
})(MyReactNode);
