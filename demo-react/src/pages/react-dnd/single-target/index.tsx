import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "./Container";

const SingleTarget = () => {
  return (
    <div className="full-content">
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
};

export default SingleTarget;
