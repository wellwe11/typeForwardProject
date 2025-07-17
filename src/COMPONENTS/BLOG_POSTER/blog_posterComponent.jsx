import "./blog_poster.scss";
import { useLocation } from "react-router-dom";

import SubscribeComponent from "../SUBSCRIBE/SUBSCRIBE";
import SizeContainerComponent from "../abstract_components/sizeContainer/sizeContainerComponent";
import BlogSections from "../abstract_components/blogSections/blogContent/blogContent";
import HeaderSection from "../abstract_components/blogSections/headerContent/headerContent";

const BlogPosterComponent = ({ data, sectionRef }) => {
  const { hash } = useLocation(); // blog_poster#posterOne etc

  const blogServicesEntries = Object.entries(data.Blog.services);

  if (data.Blog.services) {
    // parse correct obj
    const blogData = blogServicesEntries.filter((link) =>
      link.includes(hash.replace(/#/g, ""))
    );

    const specifiedData = blogData?.[0]?.[1]?.blog || [];

    return (
      <SizeContainerComponent
        sectionColor="white"
        sectionRef={(el) => (sectionRef.current[0] = el)}
      >
        <div className="blogSectionComponent">
          <div className="blogSectionHeader">
            <HeaderSection
              data={specifiedData.header}
              sections={specifiedData.sections}
            />
          </div>
          <div className="blogSections">
            <BlogSections data={specifiedData.sections} />
          </div>

          <SubscribeComponent
            sectionRef={(el) => (sectionRef.current[1] = el)}
          />
        </div>
      </SizeContainerComponent>
    );
  }
};

export default BlogPosterComponent;
