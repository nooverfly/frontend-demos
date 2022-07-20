import { useState } from "react";
import SplitPane from "react-split-pane";

const MySplitPane: any = SplitPane;

const SnapToPosition = () => {
  const [size, setSize] = useState<any>(undefined);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
    setTimeout(() => {
      setSize(undefined);
    }, 0);
  };

  const handleDrag = (width: number) => {
    console.log(width);
    if (width >= 300 && width <= 400) {
      setSize(300);
    } else if (width > 400 && width <= 500) {
      setSize(500);
    } else {
      setSize(undefined);
    }
  };

  const dropWarnStyle = {
    backgroundColor: "yellow",
    left: 300,
    width: 200,
  };
  const centeredTextStyle: any = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "fixed" }}>
      <MySplitPane
        size={dragging ? undefined : size}
        onChange={handleDrag}
        onDragStarted={handleDragStart}
        onDragFinished={handleDragEnd}
      >
        <div
          style={{
            backgroundColor: "blue",
            height: "100%",
            zIndex: 1,
            opacity: 0.1,
          }}
        />
        <div />
      </MySplitPane>
      <div
        style={Object.assign({}, centeredTextStyle, { left: 0, width: 300 })}
      >
        Can drop anywhere
      </div>
      <div style={Object.assign({}, centeredTextStyle, dropWarnStyle)}>
        Will snap to edges
      </div>
      <div
        style={Object.assign({}, centeredTextStyle, {
          left: 500,
          width: "calc(100% - 500px)",
        })}
      >
        Can drop anywhere
      </div>
    </div>
  );
};

export default SnapToPosition;
