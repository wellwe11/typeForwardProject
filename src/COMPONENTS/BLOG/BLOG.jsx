import "./BLOG.scss";
import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";
import { GridImageEffect } from "./gridWaveEffect";

import SubsrcibeComponent from "../HOME/SUBSCRIBE/SUBSCRIBE";

import { WaveImageEffect } from "./blobWaveEffect";

const BlogComponent = ({ data, sectionRef }) => {
  if (data.blog) {
    console.log(data);
    return (
      <div className="blogContainer">
        <ProfilesComponent
          data={data}
          profileTitle={""}
          canHover={false}
          section={"blog"}
          sectionColor={"white"}
          linkOrButton={"Link"}
          event={"services"}
          eventName={"Learn more"}
          flexOrder={2}
          headerSize={4.5}
          ExternalImage={[GridImageEffect, WaveImageEffect]}
        />
        <div className="borderDiv"></div>
        <SubsrcibeComponent sectionRef={sectionRef} />
      </div>
    );
  }
};

export default BlogComponent;
