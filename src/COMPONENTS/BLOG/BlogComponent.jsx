import "./BLOG.scss";
import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";
import { GridImageEffect } from "./gridWaveEffect";

import SubsrcibeComponent from "../SUBSCRIBE/SUBSCRIBE";

import { WaveImageEffect } from "./blobWaveEffect";

const BlogComponent = ({ data, sectionRef }) => {
  console.log(data);
  if (data.Blog) {
    const blogKeys = Object.keys(data.Blog.services).map(
      (key) => "blog/blog_poster/#" + key
    );

    return (
      <div className="blogContainer">
        <ProfilesComponent
          data={data}
          profileTitle={"no title"}
          canHover={false}
          section={"Blog"}
          sectionColor={"white"}
          linkOrButton={"Link"}
          event={blogKeys}
          eventName={"Learn more"}
          flexOrder={2}
          headerSize={4.5}
          ExternalImage={[GridImageEffect, WaveImageEffect]}
          sectionRef={(el) => (sectionRef.current[0] = el)}
        />

        <SubsrcibeComponent sectionRef={(el) => (sectionRef.current[1] = el)} />
      </div>
    );
  }
};

export default BlogComponent;
