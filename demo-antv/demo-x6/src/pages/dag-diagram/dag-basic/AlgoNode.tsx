import { Component } from "react";
import { Node } from "@antv/x6";

const image = {
  logo: "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ",
  success:
    "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ",
  failed:
    "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ",
  running:
    "https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ",
};

interface NodeStatus {
  id: string;
  status: "default" | "success" | "failed" | "running";
  label?: string;
}

export default class AlgoNode extends Component<{ node?: Node }> {
  shouldComponentUpdate() {
    const { node } = this.props;
    if (node) {
      if (node.hasChanged("data")) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { node } = this.props;
    const data = node?.getData() as NodeStatus;
    const { label, status = "default" } = data;

    return (
      <div className={`node ${status}`}>
        <img src={image.logo} />
        <span className="label">{label}</span>
        <span className="status">
          {status === "success" && <img src={image.success} />}
          {status === "failed" && <img src={image.failed} />}
          {status === "running" && <img src={image.running} />}
        </span>
      </div>
    );
  }
}
