import "./SERVICES.scss";
import SubscribeComponent from "../HOME/SUBSCRIBE/SUBSCRIBE";

import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";
import TopSectionBio from "../abstract_components/topSectionBio/topSectionBio";

const ServicesComponent = ({ sectionRef, data }) => {
  if (!data || !data.services) {
    return <div>Loading...</div>;
  }

  if (data.services) {
    const dataEntries = Object.entries(data?.services);
    console.log(dataEntries);

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
          section={"services"}
          sectionColor={"white"}
          linkOrButton={"button"}
          event={""}
          eventName={"Get in touch"}
          flexOrder={2}
        />

        <div className="borderDiv"></div>
        <SubscribeComponent sectionRef={sectionRef} />
      </div>
    );
  }
};

export default ServicesComponent;
