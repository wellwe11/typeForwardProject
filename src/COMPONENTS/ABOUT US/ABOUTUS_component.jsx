import "./ABOUTUS.scss";

import React, { memo } from "react";

import TopSectionBio from "../abstract_components/topSectionBio/topSectionBio";
import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";

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
        <TopSectionBio data={aboutUsEntries} displaySocials={true} />
        <ProfilesComponent
          data={data}
          canHover={true}
          section={"about_us"}
          sectionColor={"white"}
          flexOrder={1}
        />
      </div>
    );
  }
};

export default React.memo(AboutUsComponent);
