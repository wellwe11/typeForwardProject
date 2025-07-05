import "./typeSection.scss";

import { useEffect, useState } from "react";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import fetchText from "../../../../functions/importFont";
import fetchWholeMd from "../../../../functions/fetchWholeMd";
import { TypeFaceComponent } from "../../../TYPEFACES/TYPEFACE";
import BorderWithBorderBox from "../../borderWithBorder";

const ButtonContainer = () => {
  return (
    <div className="typeButtons">
      <div className="typeButtonContainer">
        <BorderWithBorderBox eventHandler={"button"} backgroundColor="black">
          Buy ↗
        </BorderWithBorderBox>
      </div>
      <div className="typeButtonContainer">
        <BorderWithBorderBox eventHandler={"button"} backgroundColor="black">
          Download ↓
        </BorderWithBorderBox>
      </div>
    </div>
  );
};

const TypeSideComponent = ({ type, artists }) => {
  return (
    <div className="typeInfoContainer">
      <TypeFaceComponent type={type} fontColor="white">
        {artists && (
          <>
            {`Designed by ${artists[0]} ${
              artists.length > 1 ? "and " + artists[1] : ""
            }${artists.length > 2 ? artists.slice(2) : ""} `}
          </>
        )}
      </TypeFaceComponent>
    </div>
  );
};

const TypeHeader = ({ type, artists }) => {
  console.log(type);

  return (
    <SizeContainerComponent>
      <div className="typeHeader">
        <TypeSideComponent type={type} artists={artists} />
        <ButtonContainer />
      </div>
    </SizeContainerComponent>
  );
};

export default TypeHeader;
