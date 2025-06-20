import "./HOME.scss";
import { Link } from "react-router-dom";
import { memo } from "react";

import mobileServiceIcon from "../../resourceFolder_typeFoward/assets/images/mobile-type-services.svg";
import BorderWithBorderBox from "../abstract_components/borderWithBorder";
import H_OneComponent from "../abstract_components/componentTitle/componentTitle";

const TypeServicesComponent = ({ sectionRef }) => {
  const componentText = (
    <span className="componentText">
      <h3 className="bold">
        Whether it’s one of our finely-tuned creations, a custom-built font,
        tailor-made lettering or an exclusive logotype, your brand deserves a
        competitive edge. So why wait?
      </h3>
      <div className="brSpaceOne" />
      <h3 className="thin">
        At Type Forward, we believe in the power of individuality. It’s a notion
        that can trace its roots back to the origins of design and one that has
        propelled us to new horizons while enriching our shared perspectives.
        Deep within our vaults, we have something for everyone, newly-minted
        startups or veteran players alike.
      </h3>
    </span>
  );

  return (
    <section
      className="sectionBlack"
      ref={(el) => (sectionRef.current[2] = el)}
    >
      <div className="serviceSection">
        <div className="typeServicesContainer">
          <div className="innerWidthContainer">
            <div className="textPart">
              <H_OneComponent title={"Type Services"} />
              <div className="brSpaceTwo" />
              {componentText}
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
        </div>
      </div>
    </section>
  );
};

export default memo(TypeServicesComponent);
