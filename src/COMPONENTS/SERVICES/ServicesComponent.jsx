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
          sectionRef={sectionRef}
          data={dataEntries}
          displayImages={true}
          configuredTitle={"Type Services"}
        />
        <ProfilesComponent
          data={data}
          canHover={false}
          section={"Services"}
          sectionColor={"white"}
          linkOrButton={"button"}
          event={null}
          eventName={"Get in touch"}
          flexOrder={2}
        />

        <SubscribeComponent sectionRef={sectionRef} />
      </div>
    );
  }
};

export default ServicesComponent;
