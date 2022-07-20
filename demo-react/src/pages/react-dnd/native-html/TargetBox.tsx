import React, { CSSProperties, FC } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

const style: CSSProperties = {
  border: "1px solid gray",
  height: "15rem",
  width: "15rem",
  padding: "2rem",
  textAlign: "center",
};

export interface TargetBoxProps {
  onDrop: (arg: { html: any }) => void;
}

const TargetBox: FC<TargetBoxProps> = ({ onDrop }) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.HTML],
      drop(item: { html: any }) {
        debugger;
        if (onDrop) {
          onDrop(item);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop]
  );

  const isActive = canDrop && isOver;
  return (
    <div ref={drop} style={style}>
      {isActive ? "Release to drop" : "Drag HTML here"}
    </div>
  );
};

export default TargetBox;
