import "./topSectionBio.scss";
import { useEffect, useState } from "react";
import firstLetterCapital from "../../../functions/turnFirstLetterCapital";
import fetchText from "../../../functions/importFont";
import BoldAndThinText from "../boldAndThinText/boldAndThinText";
import H_OneComponent from "../componentTitle/componentTitle";
import ContactUsComp from "../contactUs/contactUs";
import SizeContainerComponent from "../sizeContainer/sizeContainerComponent";
import BorderWithBorderBox from "../borderWithBorder";
import LinkImagesComponent from "../smallIcons/smallIconsComponent";

const TopSectionBio = ({
  sectionRef,
  data,
  configuredTitle,
  displayImages,
  displaySocials,
}) => {
  const [thinText, setThinText] = useState("");
  const [boldText, setBoldText] = useState("");
  const dataobject = Object.fromEntries(data).services;
  const updatedData = Object.fromEntries(data);
  const componentTitle = Object.fromEntries(data)._embedded.info.title;

  useEffect(() => {
    const mdUrl = updatedData.bio[0].url;

    if (mdUrl) {
      fetchText(mdUrl, setThinText, setBoldText);
    }
  }, []);

  const displayIcons = Object.entries(updatedData.services).filter(
    ([key, value]) =>
      key !== "bio" && key !== "_embedded" && value !== "services"
  );

  return (
    <SizeContainerComponent
      sectionColor={"black"}
      //   sectionRef={(el) => (sectionRef.current[5] = el)}
    >
      <div className="topSectionBioSectionContainer">
        <div className="titleContainer">
          <H_OneComponent title={configuredTitle || componentTitle} />
        </div>
        <div className="topSectionBioIconsContainer">
          {displayImages &&
            displayIcons.map(([key, value]) => (
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
        <div className="topSectionBioText">
          <div className="topSectionBioTextOne">
            <BoldAndThinText
              boldText={boldText}
              thinText={thinText}
              amountOfSpace={2}
            />
          </div>
          <div className="topSectionBioTextTwo">
            <ContactUsComp color={"white"} />
            {displaySocials && (
              <LinkImagesComponent
                sectionColor={"black"}
                data={updatedData._embedded.info.socials}
              />
            )}
          </div>
        </div>
      </div>
    </SizeContainerComponent>
  );
};

export default TopSectionBio;
