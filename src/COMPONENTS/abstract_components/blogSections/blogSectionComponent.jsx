import "./blogSectionComponent.scss";
import { useEffect, useState } from "react";
import H_OneComponent from "../componentTitle/componentTitle";
import fetchAllText from "../../../functions/fetchAllText";

const sortByPosition = (items) => {
  return items.sort(
    ([, a], [, b]) => +a?._embedded.info.position - +b?._embedded.info.position
  );
};

const BlogTexts = ({ data, images, videos }) => {
  const [localThinText, setThinText] = useState(null);
  const [localBioText, setBioText] = useState(null);
  const [localImages, setLocalImages] = useState(null);
  const [localVideos, setLocalVideos] = useState(null);

  const sortType = (type, setter) => {
    // const sortedImagesObj = imageFolder.reduce((acc, [_, image]) => {
    const sortedImagesObj = type.map((i, index) =>
      i.url.toLowerCase().includes("square")
        ? { square: i.url }
        : { main: i.url }
    );

    setter(sortedImagesObj);
  };

  const getText = async (url) => {
    const { thinText, bioText } = await fetchAllText(url);

    setThinText(thinText);
    setBioText(bioText);
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

  if (localThinText || localBioText || localImages || localVideos) {
    return (
      <div>
        <h3 style={{ color: "black" }}>{localThinText}</h3>
        {localVideos && (
          <video
            preload="none"
            autoPlay
            loop
            muted
            playsInline
            poster={localImages[0].square}
          >
            <source
              src={localVideos[0].square}
              type="video/mp4"
              media="(max-width: 999px)"
            />
            <source src={localVideos[1].main} type="video/mp4" />
          </video>
        )}

        {!localVideos && localImages && (
          <picture>
            <source src={localImages[0].square} media="(max-width: 999px)" />
            <source src={localImages[1].main} media="(min-width: 1000px)" />
            <img src={localImages[0].square} alt="fallback image" />
          </picture>
        )}
        <h4 style={{ color: "black" }}>{localBioText}</h4>
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
      <div>
        {sectionsSorted.map(([section, input]) => {
          console.log(section, input);
          return (
            <div key={section}>
              <BlogTexts
                data={input.bio[0]?.url}
                images={input.images || null}
                videos={input.videos || null}
              />
            </div>
          );
        })}
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
            <h3>{section}</h3>
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
