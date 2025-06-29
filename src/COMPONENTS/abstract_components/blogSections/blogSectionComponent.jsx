import "./blogSectionComponent.scss";
import { useEffect, useState } from "react";
import H_OneComponent from "../componentTitle/componentTitle";
import fetchAllText from "../../../functions/fetchAllText";

const sortByPosition = (items) => {
  return items.sort(
    ([, a], [, b]) => +a?._embedded.info.position - +b?._embedded.info.position
  );
};

const BlogContent = ({ data, images, videos }) => {
  const [localThinText, setThinText] = useState(null);
  const [localBioText, setBioText] = useState(null);
  const [localImages, setLocalImages] = useState(null);
  const [localVideos, setLocalVideos] = useState(null);
  const [localSections, setLocalSections] = useState(null);
  const [localCodeText, setLocalCodeText] = useState(null);

  const sortType = (type, setter) => {
    const sorted = {};

    type.forEach((i) => {
      if (i.url.toLowerCase().includes("square")) {
        sorted.square = i.url;
      } else {
        sorted.main = i.url;
      }
    });

    setter(sorted);
  };

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

  useEffect(() => {
    if (images) {
      sortType(images, setLocalImages);
    }

    if (videos) {
      sortType(videos, setLocalVideos);
    }
  }, [images, videos]);

  if (localCodeText) {
    console.log(localCodeText);
  }

  if (
    localThinText ||
    localBioText ||
    localImages ||
    localVideos ||
    localCodeText
  ) {
    return (
      <div className="blogContentContainer">
        <h3 className="blogMainText" style={{ color: "black" }}>
          {localThinText}
        </h3>
        {localVideos && (
          <div className="blogImageContainer">
            <video
              preload="none"
              autoPlay
              loop
              muted
              playsInline
              poster={localImages.square}
            >
              <source
                src={localVideos.square}
                type="video/mp4"
                media="(max-width: 999px)"
              />
              <source
                src={localVideos.main}
                type="video/mp4"
                media="(min-width: 1000px)"
              />
              <source src={localVideos.main} type="video/mp4" />
            </video>
          </div>
        )}

        {!localVideos && localImages && (
          <div className="blogImageContainer">
            <picture>
              <source media="(min-width: 1000px)" srcSet={localImages.main} />
              <source media="(max-width: 999px)" srcSet={localImages.square} />
              <img src={localImages.main} alt="fallback image" />
            </picture>
          </div>
        )}

        {localCodeText && (
          <pre className="code-section">
            <code>{localCodeText.replace(/`/g, "")}</code>
          </pre>
        )}

        {localSections && (
          <ul className="blogSectionUl">
            {localSections.map((section, index) => (
              <li className="blogLi" key={index}>
                <h4 className="blogLiText">
                  <strong>{section.bold} </strong>
                  {section.thin} <a href={section.linkTo}>{section.link}</a>
                </h4>
              </li>
            ))}
          </ul>
        )}

        <h4 className="blogSubText" style={{ color: "black" }}>
          {localBioText}
        </h4>
      </div>
    );
  }
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

const BlogSections = ({ data }) => {
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

const HeaderSection = ({ data, sections }) => {
  const [title, setTitle] = useState();
  const [boldText, setBoldText] = useState();
  const [thinText, setThinText] = useState();
  const [imagesObj, setImagesObj] = useState({});
  const imageFolder = Object.entries(data.images);

  const getText = async () => {
    const { bigTitle, boldText, thinText } = await fetchAllText(data[0].url);
    setBoldText(boldText);
    setTitle(bigTitle);
    setThinText(thinText);
  };

  const sortImages = () => {
    const sortedImagesObj = imageFolder.reduce((acc, [_, image]) => {
      const key = image.url.toLowerCase().includes("square")
        ? "square"
        : "main";
      acc[key] = image;

      return acc;
    }, {});

    setImagesObj(sortedImagesObj);
  };

  useEffect(() => {
    getText();
    sortImages();
  }, []);

  if ((title, thinText, imagesObj, sections)) {
    const sectionsKeys = Object.keys(sections);
    return (
      <div className="headerSectionContainer">
        <div className="blogImageContainer">
          <picture>
            <source media="(max-width: 999px)" srcSet={imagesObj.square?.url} />
            <source media="(min-width: 1000px)" srcSet={imagesObj.main?.url} />
            <img src={imagesObj.square?.url} alt="Header image" />
          </picture>
        </div>
        <div className="headerBio">
          <div className="headerContainer">
            <H_OneComponent title={title} textColor={"black"} textSize={5} />
          </div>
          <div className="dateContainer">
            <h2 className="dateText">{boldText}</h2>
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

const BlogSectionComponent = ({ data }) => {
  return (
    <div className="blogSectionComponent">
      <HeaderSection data={data.header} sections={data.sections} />
      <BlogSections data={data.sections} />
    </div>
  );
};

export default BlogSectionComponent;
