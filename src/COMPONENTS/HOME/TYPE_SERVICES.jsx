import "./HOME.scss";
import { Link } from "react-router-dom";
import { memo } from "react";

import mobileServiceIcon from "../../resourceFolder_typeFoward/assets/images/mobile-type-services.svg";

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
              <h1 className="serviceTitle">Type Services</h1>
              <div className="brSpaceTwo" />
              {componentText}
            </div>
            <div className="imagePart">
              <div className="insideImagePart">
                <div className="borderContainer">
                  <img src={mobileServiceIcon} alt="" />
                  <Link className="learnMorebutton" to="./services">
                    <span>
                      <h2 className="buttonText">Learn more</h2>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(TypeServicesComponent);
