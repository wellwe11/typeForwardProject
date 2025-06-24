import "./HOME.scss";
import { memo, useEffect, useState } from "react";

import BorderWithBorderBox from "../abstract_components/borderWithBorder";
import H_OneComponent from "../abstract_components/componentTitle/componentTitle";
import SizeContainerComponent from "../abstract_components/sizeContainer/sizeContainerComponent";
import BoldAndThinText from "../abstract_components/boldAndThinText/boldAndThinText";

import fetchText from "../../functions/importFont";
import findItem from "../../functions/findNestedItemInObj";

const TypeServicesComponent = ({ sectionRef, data }) => {
  const [boldText, setBoldText] = useState("");
  const [thinText, setThinText] = useState("");
  const text = findItem(data, "bio")[0].url;
  const images = findItem(data, "images")[0].url;

  useEffect(() => {
    fetchText(text, setThinText, setBoldText);
  }, []);

  return (
    <SizeContainerComponent
      sectionColor={"black"}
      sectionRef={(el) => (sectionRef.current[2] = el)}
    >
      <div className="typeServiceContentContainer">
        <div className="textPart">
          <H_OneComponent title={"Type Services"} />
          <div className="brSpaceTwo" />
          <BoldAndThinText
            boldText={boldText}
            thinText={thinText}
            fontType="h3"
            amountOfSpace={3}
          />
        </div>
        <div className="imagePartContainer">
          <BorderWithBorderBox
            img={images}
            showLink={true}
            eventHandler={"Link"}
            event={"services"}
            backgroundColor="black"
            textSize="h2"
          >
            {"Learn more"}
          </BorderWithBorderBox>
        </div>
      </div>
    </SizeContainerComponent>
  );
};

export default memo(TypeServicesComponent);
