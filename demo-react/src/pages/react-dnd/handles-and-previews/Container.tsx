import React from "react";
import BoxWithHandle from "./BoxWithHandle";
import BoxWithImage from "./BoxWithImage";

const Container = () => {
  return (
    <div>
      <div style={{ marginTop: "1.5rem" }}>
        <BoxWithHandle />
        <BoxWithImage />
      </div>
    </div>
  );
};

export default Container;
