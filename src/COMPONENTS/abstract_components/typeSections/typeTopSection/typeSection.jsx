import "./typeSection.scss";

import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import { TypeFaceComponent } from "../../../TYPEFACES/TYPEFACE";
import BorderWithBorderBox from "../../borderWithBorder";

export const ButtonContainer = ({ backgroundColor = "black" }) => {
  return (
    <div className="typeButtons">
      <div className="typeButtonContainer">
        <BorderWithBorderBox
          eventHandler={"button"}
          backgroundColor={backgroundColor}
        >
          Buy ↗
        </BorderWithBorderBox>
      </div>
      <div className="typeButtonContainer">
        <BorderWithBorderBox
          eventHandler={"button"}
          backgroundColor={backgroundColor}
        >
          Download ↓
        </BorderWithBorderBox>
      </div>
    </div>
  );
};

const TypeSideComponent = ({ type, artists }) => {
  if (type && artists) {
    return (
      <div className="typeInfoContainer">
        <TypeFaceComponent type={type} fontColor="white">
          {`Designed by ${artists}.`}
        </TypeFaceComponent>
      </div>
    );
  }
};

const TypeHeader = ({ type, fontInfo }) => {
  if (type) {
    const artists = fontInfo?.designer;
    return (
      <SizeContainerComponent>
        <div className="typeHeader">
          <TypeSideComponent type={type} artists={artists} />
          <ButtonContainer />
        </div>
      </SizeContainerComponent>
    );
  }
};

export default TypeHeader;
