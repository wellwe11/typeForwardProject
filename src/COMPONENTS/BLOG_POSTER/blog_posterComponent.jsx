import { useLocation, useNavigate } from "react-router-dom";
import BlogSectionComponent from "../abstract_components/blogSections/blogSectionComponent";

const BlogPosterComponent = ({ data }) => {
  const { hash } = useLocation(); // blog_poster#posterOne etc

  const blogServicesEntries = Object.entries(data.blog.services);

  if (data.blog.services) {
    // parse correct obj
    const blogData = blogServicesEntries.filter((link) =>
      link.includes(hash.replace(/#/g, ""))
    );

    return (
      <div>
        <BlogSectionComponent data={blogData[0][1].blog || []} />
      </div>
    );
  }
};

export default BlogPosterComponent;
