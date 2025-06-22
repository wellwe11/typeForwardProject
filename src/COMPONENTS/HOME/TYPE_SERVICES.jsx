import "./HOME.scss";
import { Link } from "react-router-dom";
import { memo } from "react";

import mobileServiceIcon from "../../resourceFolder_typeFoward/images/mobile-type-services.svg";
import BorderWithBorderBox from "../abstract_components/borderWithBorder";
import H_OneComponent from "../abstract_components/componentTitle/componentTitle";
import SizeContainerComponent from "../abstract_components/sizeContainer/sizeContainerComponent";
import BoldAndThinText from "../abstract_components/boldAndThinText/boldAndThinText";

const TypeServicesComponent = ({ sectionRef }) => {
  const boldText = `
Whether it’s one of our finely-tuned creations, a custom-built font,
tailor-made lettering or an exclusive logotype, your brand deserves a
competitive edge. So why wait?
`;
  const thinText = `
At Type Forward, we believe in the power of individuality. It’s a notion
that can trace its roots back to the origins of design and one that has
propelled us to new horizons while enriching our shared perspectives.
Deep within our vaults, we have something for everyone, newly-minted
startups or veteran players alike.
`;

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
            img={mobileServiceIcon}
            showLink={true}
            linkTo={"services"}
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
