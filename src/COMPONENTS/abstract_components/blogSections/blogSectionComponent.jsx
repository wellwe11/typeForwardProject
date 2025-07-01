import "./blogSectionComponent.scss";
import React, { useEffect, useState } from "react";
import H_OneComponent from "../componentTitle/componentTitle";
import fetchAllText from "../../../functions/fetchAllText";
import ReactMarkdown from "react-markdown";
import sortByPosition from "../../../functions/sortByPosition";
import DisplayMediaComponent from "../displayMediaComponent/displayMediaComponent";
import BlogContent from "./blogContent/blogContent";

const BlogSection = ({ data }) => {
  const dataEntries = Object.entries(data);

  const sectionsFiltered = dataEntries.filter(
    (section) => !section.includes("_embedded")
  );

  const sectionsSorted = sortByPosition(sectionsFiltered);

  if (sectionsSorted) {
    return (
      <div className="blogSection">
        <div className="border"></div>
        {sectionsSorted.map(([section, input]) => (
          <div key={section}>
            <BlogContent
              data={input.bio[0]?.url}
              images={input.images || null}
              videos={input.videos || null}
            />
          </div>
        ))}
      </div>
    );
  }
};

export const BlogSections = ({ data }) => {
  const sectionEntries = Object.entries(data);

  const sortByPosition = (items) => {
    return items.sort(
      ([, a], [, b]) =>
        +a?._embedded.info.position - +b?._embedded.info.position
    );
  };
  const sectionsSorted = sortByPosition(sectionEntries);

  return (
    <div className="blogSectionsContainer">
      {sectionsSorted.map(([section, obj]) => (
        <div className="blogSectionContainer" key={section}>
          <div className="blogSectionTitleContainer">
            <h2>{section.replace(/_/g, " ")}</h2>
          </div>
          <BlogSection data={obj} />
        </div>
      ))}
    </div>
  );
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

  if ((title, thinText, sections)) {
    const sectionsKeys = Object.keys(sections);
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
          <div className="headerBioTextContainer">
            <h3 className="headerBioText">
              <ReactMarkdown>{thinText}</ReactMarkdown>
            </h3>
          </div>
          <ul className="headerSectionsContainer">
            {sectionsKeys.map((section, index) => (
              <li key={index} className="headerSection">
                <button className="headerLiButton">
                  <h2 style={{ color: "black" }}>
                    {section.replace(/_/g, " ")}
                  </h2>
                  <div className="underLine"></div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
};
