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
        />
        <ProfilesComponent
          data={data}
          canHover={true}
          section={"AboutUs"}
          sectionColor={"white"}
          flexOrder={1}
        />

        <SubscribeComponent sectionRef={sectionRef} />
      </div>
    );
  }
};

export default React.memo(AboutUsComponent);
