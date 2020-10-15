import React from "react";
import Debate from "./Debate";
import UnitedStates from "./UnitedStates";
const SVG = (props) => {
  switch (props.type) {
    case "Debate":
      return <Debate {...props} />;
    case "UnitedStates":
      return <UnitedStates {...props} />;
    default:
      return null;
  }
};

export default SVG;
