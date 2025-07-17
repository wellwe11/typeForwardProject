import "./SERVICES.scss";
import SubscribeComponent from "../SUBSCRIBE/SUBSCRIBE";

import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";
import TopSectionBio from "../abstract_components/topSectionBio/topSectionBio";

const ServicesComponent = ({ sectionRef, data }) => {
  if (!data || !data.Services) {
    return <div>Loading...</div>;
  }

  if (data.Services) {
    const dataEntries = Object.entries(data?.Services);

    return (
      <div className="servicesComponentContainer">
        <TopSectionBio
          sectionRef={(el) => (sectionRef.current[0] = el)}
          data={dataEntries}
          displayImages={true}
          configuredTitle={"Type Services"}
        />
        <ProfilesComponent
          sectionRef={(el) => (sectionRef.current[1] = el)}
          data={data}
          canHover={false}
          section={"Services"}
          sectionColor={"white"}
          linkOrButton={"button"}
          event={null}
          eventName={"Get in touch"}
          flexOrder={2}
        />

        <SubscribeComponent sectionRef={(el) => (sectionRef.current[2] = el)} />
      </div>
    );
  }
};

export default ServicesComponent;
