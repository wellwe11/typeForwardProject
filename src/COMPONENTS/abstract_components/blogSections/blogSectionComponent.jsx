import "./blogSectionComponent.scss";
import React, { useEffect, useState } from "react";
import H_OneComponent from "../componentTitle/componentTitle";
import fetchAllText from "../../../functions/fetchAllText";
import SubscribeComponent from "../../HOME/SUBSCRIBE/SUBSCRIBE";
import RenderLineSplit from "../renderLineSplit";

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
  const [localLinkTo, setLocalLinkTo] = useState(null);
  const [localLink, setLocalLink] = useState(null);

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
    const { thinText, bioText, sections, codeText, link, linkTo } =
      await fetchAllText(url);

    console.log(link, linkTo);

    setThinText(thinText);
    setBioText(bioText);

    if (sections) {
      setLocalSections(sections);
    }

    if (codeText) {
      setLocalCodeText(codeText);
    }

    if (link) {
      setLocalLink(link);
    }

    if (linkTo) {
      setLocalLinkTo(linkTo);
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

  if (
    localThinText ||
    localBioText ||
    localImages ||
    localVideos ||
    localCodeText
  ) {
    return (
      <div className="blogContentContainer">
        <h3 className="blogMainText">
          {localThinText?.includes("REPLACE_LINK")
            ? localThinText?.split("REPLACE_LINK").map((part, index, arr) => (
                <React.Fragment key={index}>
                  {part}
                  {index < arr.length - 1 && localLinkTo?.[index] && (
                    <button>
                      <a
                        href={localLinkTo[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {Array.isArray(localLink)
                          ? localLink[index]
                          : localLink}
                      </a>
                    </button>
                  )}
                </React.Fragment>
              ))
            : localThinText}
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
              <source
                media="(min-width:image/svg+xml 1000px)"
                srcSet={localImages.main}
              />
              <source media="(max-width: 999px)" srcSet={localImages.square} />
              <img src={localImages.main} alt="fallback image" />
            </picture>
          </div>
        )}

        <div>
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
                    {section.thin
                      .split("REPLACE_LINK")
                      .map((part, index, arr) => (
                        <React.Fragment>
                          {part}
                          {index < arr.length - 1 &&
                            section.linkTo?.[index] && (
                              <a
                                href={section.linkTo[index]}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {Array.isArray(section.link)
                                  ? section.link[index]
                                  : section.link}
                              </a>
                            )}
                        </React.Fragment>
                      ))}
                  </h4>
                </li>
              ))}
            </ul>
          )}
        </div>

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
  const [mediaObj, setMediaObj] = useState({});
  const mediaFolder = Object.entries(data.media);

  const getText = async () => {
    const { bigTitle, boldText, thinText } = await fetchAllText(data[0].url);
    setBoldText(boldText);
    setTitle(bigTitle);
    setThinText(thinText);
  };

  const sortMedia = () => {
    const sortedImagesObj = mediaFolder.reduce((acc, [_, media]) => {
      const key = media.url.toLowerCase().includes("square")
        ? "square"
        : "main";
      acc[key] = media;

      return acc;
    }, {});

    setMediaObj(sortedImagesObj);
  };

  useEffect(() => {
    getText();
    sortMedia();
  }, []);

  if ((title, thinText, mediaObj, sections)) {
    const sectionsKeys = Object.keys(sections);
    return (
      <div className="headerSectionContainer">
        <div className="blogImageContainer">
          {mediaObj.main?.url.match(/\.(svg|jpe?g|png|webp)$/) && (
            <picture className="mediaSource">
              <source
                media="(max-width: 999px)"
                srcSet={mediaObj.square?.url}
              />
              <source media="(min-width: 1000px)" srcSet={mediaObj.main?.url} />
              <img src={mediaObj.main?.url} alt="Header image fallback" />
            </picture>
          )}

          {mediaObj.main?.url.match(/\.(mp4)$/) && (
            <video
              preload="none"
              autoPlay
              loop
              muted
              playsInline
              poster={mediaObj?.main.url}
            >
              <source
                src={mediaObj?.square.url}
                type="video/mp4"
                media="(max-width: 999px)"
              />
              <source
                src={mediaObj?.main.url}
                type="video/mp4"
                media="(min-width: 1000px)"
              />
              <img src={mediaObj.square?.url} alt="Header video fallback" />
            </video>
          )}
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
      <SubscribeComponent sectionRef={" "} />
    </div>
  );
};

export default BlogSectionComponent;
