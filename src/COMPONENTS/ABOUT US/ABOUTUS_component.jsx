import "./ABOUTUS.scss";

import BoldAndThinText from "../abstract_components/boldAndThinText/boldAndThinText";
import H_OneComponent from "../abstract_components/componentTitle/componentTitle";
import ContactUsComp from "../abstract_components/contactUs/contactUs";
import SizeContainerComponent from "../abstract_components/sizeContainer/sizeContainerComponent";
import LinkImagesComponent from "../abstract_components/smallIcons/smallIconsComponent";

const AboutUsInfoContainer = () => {
  const boldText =
    "Type Forward is an independent type foundry founded by us - Stan Partalev and Mirela Belova.";

  const thinText =
    "After working together with significant ease for the past few years, we decided it was time to team up. We started out as visual artists in various fields. However, we both found ourselves most inspired when creating functional designs, which in time grew into a passion for typography and type design. Driven by shared vision and inspiration, we focus on producing high-quality original fonts with great technological care. Now with several years of experience working on different successful typefaces, we are ever so motivated to share what we are capable of.";

  return (
    <SizeContainerComponent sectionColor={"black"}>
      <div className="aboutUsComponentContainer">
        <H_OneComponent title={"About us"} />
        <div className="aboutUsContentContainer">
          <div className="leftContainer">
            <BoldAndThinText
              boldText={boldText}
              boldWeight={700}
              thinText={thinText}
              amountOfSpace={1}
            />
          </div>
          <div className="rightContainer">
            <ContactUsComp color={"white"} />
            <LinkImagesComponent sectionColor={"black"} />
          </div>
        </div>
      </div>
    </SizeContainerComponent>
  );
};

const AboutUsComponent = () => {
  return (
    <div>
      <AboutUsInfoContainer />
    </div>
  );
};

export default AboutUsComponent;
