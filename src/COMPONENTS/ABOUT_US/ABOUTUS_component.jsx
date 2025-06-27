import "./ABOUTUS.scss";

import React, { memo } from "react";

import TopSectionBio from "../abstract_components/topSectionBio/topSectionBio";
import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";
import SubscribeComponent from "../HOME/SUBSCRIBE/SUBSCRIBE";

const AboutUsComponent = ({ data, sectionRef }) => {
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
      <div className="aboutUsComponent">
        <TopSectionBio data={aboutUsEntries} displaySocials={true} />
        <ProfilesComponent
          data={data}
          canHover={true}
          section={"about_us"}
          sectionColor={"white"}
          flexOrder={1}
        />
        <div
          className="borderDiv"
          style={{
            width: "var(--inlineContentWidth)",
            height: "2px",
            backgroundColor: "black",
          }}
        ></div>
        <SubscribeComponent sectionRef={sectionRef} />
      </div>
    );
  }
};

export default React.memo(AboutUsComponent);
