import "./blog_poster.scss";
import { useLocation } from "react-router-dom";
import {
  BlogSections,
  HeaderSection,
} from "../abstract_components/blogSections/blogSectionComponent";

import SubscribeComponent from "../HOME/SUBSCRIBE/SUBSCRIBE";

const BlogPosterComponent = ({ data }) => {
  const { hash } = useLocation(); // blog_poster#posterOne etc

  const blogServicesEntries = Object.entries(data.blog.services);

  if (data.blog.services) {
    // parse correct obj
    const blogData = blogServicesEntries.filter((link) =>
      link.includes(hash.replace(/#/g, ""))
    );

    const specifiedData = blogData[0][1].blog || [];

    return (
      <div className="blogSectionComponent">
        <HeaderSection
          data={specifiedData.header}
          sections={specifiedData.sections}
        />
        <BlogSections data={specifiedData.sections} />
        <SubscribeComponent sectionRef={" "} />
      </div>
    );
  }
};

export default BlogPosterComponent;
