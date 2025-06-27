import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";
import { GridImageEffect } from "./gridWaveEffect";

import { WaveImageEffect } from "./blobWaveEffect";

const BlogComponent = ({ data }) => {
  if (data.blog) {
    console.log(data);
    return (
      <div>
        <ProfilesComponent
          data={data}
          profileTitle={" "}
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
      </div>
    );
  }
};

export default BlogComponent;
