import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";

const BlogComponent = ({ data }) => {
  console.log(data);
  if (data.blog) {
    return (
      <div>
        <ProfilesComponent
          data={data}
          profileTitle={" "}
          canHover={false}
          section={"blog"}
          sectionColor={"black"}
          linkOrButton={"Link"}
          event={"services"}
          eventName={"Learn more"}
          flexOrder={2}
          headerSize={4.5}
        />
      </div>
    );
  }
};

export default BlogComponent;
