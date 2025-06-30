import React from "react";
const RenderLineSplit = ({ text, type }) => {
  if (text) {
    const TypeComponent = type;
    return text.split(/\n\n/).map((para, index) => (
      <React.Fragment key={index}>
        <TypeComponent>
          {para}
          <br />
          <br />
        </TypeComponent>
      </React.Fragment>
    ));
  }
};

export default RenderLineSplit;
