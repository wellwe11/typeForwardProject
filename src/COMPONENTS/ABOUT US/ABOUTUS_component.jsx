import "./ABOUTUS.scss";

import BoldAndThinText from "../abstract_components/boldAndThinText/boldAndThinText";
import H_OneComponent from "../abstract_components/componentTitle/componentTitle";
import ContactUsComp from "../abstract_components/contactUs/contactUs";
import SizeContainerComponent from "../abstract_components/sizeContainer/sizeContainerComponent";
import LinkImagesComponent from "../abstract_components/smallIcons/smallIconsComponent";
import { useEffect, useState } from "react";
import fetchText from "../../functions/importFont";
import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";

const AboutUsInfoContainer = ({ data }) => {
  const [boldText, setBoldText] = useState("");
  const [thinText, setThinText] = useState("");

  useEffect(() => {
    const mdUrl = data.filter((e) => e.includes("bio"));
    const text = mdUrl[0][1][0].url;
    if (mdUrl) {
      fetchText(text, setThinText, setBoldText);
    }
  }, []);

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

const AboutUsComponent = ({ data }) => {
  if (!data.about_us) {
    return (
      <div>
        <h1>...Loading</h1>
      </div>
    );
  }

  if (data.about_us) {
    const aboutUsEntries = Object.entries(data.about_us);

    return (
      <div>
        <AboutUsInfoContainer data={aboutUsEntries} />
        <ProfilesComponent
          data={data}
          canHover={true}
          section={"about_us"}
          sectionColor={"white"}
          sliceAmount={1}
        />
      </div>
    );
  }
};

export default AboutUsComponent;
