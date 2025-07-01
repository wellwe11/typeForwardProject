import "./blogContent.scss";
import { useEffect, useState } from "react";
import fetchAllText from "../../../../functions/fetchAllText";
import DisplayMediaComponent from "../../displayMediaComponent/displayMediaComponent";
import ReactMarkdown from "react-markdown";
import sortByPosition from "../../../../functions/sortByPosition";

export const BlogMainText = ({ children, textType = "h3" }) => {
  const TypeComponent = textType;
  if (children) {
    return (
      <TypeComponent className="blogMainText">
        <ReactMarkdown>{children}</ReactMarkdown>
      </TypeComponent>
    );
  }
};

const CodeText = ({ children }) => {
  if (children) {
    return (
      <pre className="codeSection">
        <code>
          <ReactMarkdown>{children.replace(/`/g, "")}</ReactMarkdown>
        </code>
      </pre>
    );
  }
};

const SectionText = ({ sectionTexts }) => {
  if (sectionTexts) {
    return (
      <ul className="blogSectionUl">
        {sectionTexts.map((section, index) => (
          <li className="blogLi" key={index}>
            <h4 className="blogLiText">
              <strong>{section.bold} </strong>
              <ReactMarkdown>{section.thin}</ReactMarkdown>
            </h4>
          </li>
        ))}
      </ul>
    );
  }
};

const SubText = ({ children, fontType }) => {
  const TypeComponent = fontType;
  if (children) {
    return (
      <TypeComponent className="blogSubText" style={{ color: "black" }}>
        {children}
      </TypeComponent>
    );
  }
};

const BlogContent = ({ data, images, videos }) => {
  const [localThinText, setThinText] = useState(null);
  const [localBioText, setBioText] = useState(null);
  const [localSections, setLocalSections] = useState(null);
  const [localCodeText, setLocalCodeText] = useState(null);

  const getText = async (url) => {
    const { thinText, bioText, sections, codeText } = await fetchAllText(url);

    setThinText(thinText);
    setBioText(bioText);

    if (sections) {
      setLocalSections(sections);
    }

    if (codeText) {
      setLocalCodeText(codeText);
    }
  };

  useEffect(() => {
    getText(data);
  }, []);

  console.log(videos);
  return (
    <div className="blogContentContainer">
      <div className="blogMainTextContainer">
        <BlogMainText textType={"h3"}>{localThinText}</BlogMainText>
      </div>
      <DisplayMediaComponent images={images} videos={videos} />
      <div>
        <CodeText>{localCodeText}</CodeText>
        <SectionText sectionTexts={localSections} />
      </div>
      <SubText fontType={"h4"}>{localBioText}</SubText>
    </div>
  );
};

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

export default BlogSections;
