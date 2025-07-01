import "./headerContent.scss";
import React, { useEffect, useState } from "react";

import H_OneComponent from "../../componentTitle/componentTitle";
import fetchAllText from "../../../../functions/fetchAllText";
import DisplayMediaComponent from "../../displayMediaComponent/displayMediaComponent";
import { BlogMainText } from "../blogContent/blogContent";

const HeaderSectionsComponent = ({ data }) => {
  const sectionsKeys = Object.keys(data);
  if (data) {
    return (
      <ul className="headerSectionsContainer">
        {sectionsKeys.map((section, index) => (
          <li key={index} className="headerSection">
            <button className="headerLiButton">
              <h2 style={{ color: "black" }}>{section.replace(/_/g, " ")}</h2>
              <div className="underLine"></div>
            </button>
          </li>
        ))}
      </ul>
    );
  }
};

export const HeaderSection = ({ data, sections }) => {
  const [title, setTitle] = useState();
  const [boldText, setBoldText] = useState();
  const [thinText, setThinText] = useState();

  const getText = async () => {
    const { bigTitle, boldText, thinText } = await fetchAllText(data[0].url);
    setBoldText(boldText);
    setTitle(bigTitle);
    setThinText(thinText);
  };

  useEffect(() => {
    getText();
  }, []);

  return (
    <div className="headerSectionContainer">
      <DisplayMediaComponent images={data.images} videos={data.videos} />

      <div className="headerBio">
        <div className="headerContainer">
          <H_OneComponent title={title} textColor={"black"} textSize={5} />
        </div>
        <div className="dateContainer">
          <h2 className="dateText">{boldText}</h2>
        </div>

        <HeaderSectionsComponent data={sections} />
        <div className="headerSectionText">
          <BlogMainText textType="h3">{thinText}</BlogMainText>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
