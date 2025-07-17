import "./ABOUTUS.scss";

import React, { memo } from "react";

import TopSectionBio from "../abstract_components/topSectionBio/topSectionBio";
import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";
import SubscribeComponent from "../SUBSCRIBE/SUBSCRIBE";

const AboutUsComponent = ({ data, sectionRef, extendedAssets }) => {
  console.log(extendedAssets);
  if (!data.AboutUs) {
    return (
      <div>
        <h1>...Loading</h1>
      </div>
    );
  }

  if (data.AboutUs) {
    const aboutUsEntries = Object.entries(data.AboutUs);

    return (
      <div className="aboutUsComponent">
        <TopSectionBio
          data={aboutUsEntries}
          displaySocials={true}
          extendedAssets={extendedAssets}
          sectionRef={(el) => (sectionRef.current[0] = el)}
        />
        <ProfilesComponent
          data={data}
          canHover={true}
          section={"AboutUs"}
          sectionColor={"white"}
          flexOrder={1}
          sectionRef={(el) => (sectionRef.current[1] = el)}
        />

        <SubscribeComponent sectionRef={(el) => (sectionRef.current[2] = el)} />
      </div>
    );
  }
};

export default React.memo(AboutUsComponent);
