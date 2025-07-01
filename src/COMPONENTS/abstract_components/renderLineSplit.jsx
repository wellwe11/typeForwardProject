import React from "react";
const RenderLineSplit = (text) => {
  return text?.split("\n\n").map((para, index) => (
    <React.Fragment key={index}>
      {para}
      <br />
      <br />
    </React.Fragment>
  ));
};

export default RenderLineSplit;
