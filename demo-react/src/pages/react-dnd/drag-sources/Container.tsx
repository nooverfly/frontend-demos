import React from "react";
import Colors from "./Colors";
import SourceBox from "./SourceBox";
import TargetBox from "./TargetBox";

const Container = () => {
  return (
    <div style={{ overflow: "hidden", clear: "both", margin: "-.5rem" }}>
      <div style={{ float: "left" }}>
        <SourceBox color={Colors.BLUE}>
          <SourceBox color={Colors.YELLOW}>
            <SourceBox color={Colors.YELLOW} />
            <SourceBox color={Colors.BLUE} />
          </SourceBox>
          <SourceBox color={Colors.BLUE}>
            <SourceBox color={Colors.YELLOW} />
          </SourceBox>
        </SourceBox>
      </div>
      <div style={{ float: "left", marginLeft: "5rem", marginTop: ".5rem" }}>
        <TargetBox />
      </div>
    </div>
  );
};

export default Container;
