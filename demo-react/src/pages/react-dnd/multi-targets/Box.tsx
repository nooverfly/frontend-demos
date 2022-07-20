import React from "react";
import { useDrag } from "react-dnd";

const style: any = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};

const Box = ({ name, type, isDropped }: any) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type]
  );

  return (
    <div ref={drag} style={{ ...style, opacity }} data-testid="box">
      {isDropped ? <s>{name}</s> : name}
    </div>
  );
};

export default Box;
