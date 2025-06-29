import "./BLOG.scss";
import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";
import { GridImageEffect } from "./gridWaveEffect";

import SubsrcibeComponent from "../HOME/SUBSCRIBE/SUBSCRIBE";

import { WaveImageEffect } from "./blobWaveEffect";

const BlogComponent = ({ data, sectionRef }) => {
  if (data.blog) {
    const blogKeys = Object.keys(data.blog.services).map(
      (key) => "blog/blog_poster/#" + key
    );
    console.log(blogKeys);
    return (
      <div className="blogContainer">
        <ProfilesComponent
          data={data}
          profileTitle={"no title"}
          canHover={false}
          section={"blog"}
          sectionColor={"white"}
          linkOrButton={"Link"}
          event={blogKeys}
          eventName={"Learn more"}
          flexOrder={2}
          headerSize={4.5}
          ExternalImage={[GridImageEffect, WaveImageEffect]}
        />

        <SubsrcibeComponent sectionRef={sectionRef} />
      </div>
    );
  }
};

export default BlogComponent;
