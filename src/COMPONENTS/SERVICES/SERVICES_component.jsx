import "./SERVICES.scss";
import SubscribeComponent from "../HOME/SUBSCRIBE/SUBSCRIBE";

import BorderWithBorderBox from "../abstract_components/borderWithBorder";
import ContactUsComp from "../abstract_components/contactUs/contactUs";
import H_OneComponent from "../abstract_components/componentTitle/componentTitle";
import BoldAndThinText from "../abstract_components/boldAndThinText/boldAndThinText";
import SizeContainerComponent from "../abstract_components/sizeContainer/sizeContainerComponent";
import { useEffect, useState } from "react";
import fetchText from "../../functions/importFont";
import firstLetterCapital from "../../functions/turnFirstLetterCapital";
import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";

const TypeServices = ({ sectionRef, data }) => {
  const [thinText, setThinText] = useState("");
  const [boldText, setBoldText] = useState("");
  const dataobject = Object.fromEntries(data);

  console.log(dataobject);
  useEffect(() => {
    const mdUrl = dataobject.bio[0].url;

    if (mdUrl) {
      fetchText(mdUrl, setThinText, setBoldText);
    }
  }, []);

  const displayIcons = data.filter(
    ([key, value]) =>
      key !== "bio" && key !== "_embedded" && value !== "services"
  );

  return (
    <SizeContainerComponent
      sectionColor={"black"}
      sectionRef={(el) => (sectionRef.current[5] = el)}
    >
      <div className="typeServiceSectionContainer">
        <div className="titleContainer">
          <H_OneComponent title={`Type ${dataobject.linkUrl}`} />
        </div>
        <div className="typeServicesIconsContainer">
          {displayIcons.map(([key, value]) => (
            <div key={key + " " + value} className="outerContainer">
              <BorderWithBorderBox
                img={value.images?.[0].url}
                eventHandler={"button"}
                event={null}
                backgroundColor="black"
                textSize="h3"
              >
                {firstLetterCapital(key)}
              </BorderWithBorderBox>
            </div>
          ))}
        </div>
        <div className="typeServiceText">
          <div className="typeServiceTextOne">
            <BoldAndThinText
              boldText={boldText}
              thinText={thinText}
              amountOfSpace={3}
            />
          </div>
          <div className="typeServiceTextTwo">
            <ContactUsComp color={"white"} />
          </div>
        </div>
      </div>
    </SizeContainerComponent>
  );
};

const ServicesComponent = ({ sectionRef, data }) => {
  if (!data || !data.services) {
    return <div>Loading...</div>;
  }

  if (data.services) {
    const dataEntries = Object.entries(data?.services);
    console.log(dataEntries);

    return (
      <div className="servicesComponentContainer">
        <TypeServices sectionRef={sectionRef} data={dataEntries} />
        <ProfilesComponent
          data={data}
          canHover={false}
          section={"services"}
          sectionColor={"white"}
          linkOrButton={"button"}
          event={""}
          eventName={"Get in touch"}
        />

        <div className="borderDiv"></div>
        <SubscribeComponent sectionRef={sectionRef} />
      </div>
    );
  }
};

export default ServicesComponent;
