import "./typeOverview.scss";
import { useEffect, useRef, useState } from "react";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import RoundButton from "../../roundButton/roundButton";
import { FontVariationButton } from "../typeInputTexts/typeInputTexts";
import H_OneComponent from "../../componentTitle/componentTitle";
import fetchSpecificItem from "../../../../functions/fetchSpecificItem";
import BoldAndThinText from "../../boldAndThinText/boldAndThinText";

const TypeOverview = ({ screenWidth, overviewImage, placeholderImage }) => {
  const boxViewerRef = useRef();
  const [buttonHasBeenHovered, setButtonHasBeenHovered] = useState(false);

  const handleMouseDown = () => {
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        const x = e.clientX;

        if (boxViewerRef.current) {
          if (screenWidth > 1200) {
            boxViewerRef.current.style.width = `${x - 215}px`;
          } else {
            boxViewerRef.current.style.width = `${x - 130}px`;
          }
        }

        animationFrameId = null;
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="imagesContainer"
      onMouseEnter={() => setButtonHasBeenHovered(true)}
    >
      <div
        className="boxHoverViewer"
        style={{
          animation: !buttonHasBeenHovered
            ? "hoverMe 2s infinite ease-in-out"
            : "",
        }}
        ref={boxViewerRef}
        onMouseDown={handleMouseDown}
      >
        <div className="arrowRight">
          <RoundButton />
        </div>
        <div className="typeOverviewCharacteristicsContainer">
          <img
            className="typeOverviewCharacteristics"
            src={overviewImage?.characteristics[0]?.url || placeholderImage}
            alt=""
            draggable="false"
          />
        </div>
      </div>
      <div className="cleanContainer">
        <img
          className="typeOverviewClean"
          src={overviewImage?.clean[0]?.url || placeholderImage}
          alt=""
          draggable="false"
        />
      </div>
    </div>
  );
};

const FontVariationButtons = ({
  activeOverview,
  setActiveOverview,
  overviewImage,
}) => {
  if (overviewImage) {
    return (
      <div className="fontVariationContainer">
        <FontVariationButton
          buttonColor="black"
          activeFontStyle={activeOverview}
          setActiveFontStyle={setActiveOverview}
          className={"CHARACTERISTICS"}
        >
          CHARACTERISTICS
        </FontVariationButton>
        <FontVariationButton
          buttonColor="black"
          activeFontStyle={activeOverview}
          setActiveFontStyle={setActiveOverview}
          className={"ABOUT"}
        >
          ABOUT
        </FontVariationButton>
      </div>
    );
  }
};

const AboutTypeOverview = ({ data }) => {
  const [boldText, setBoldText] = useState(null);
  const [thinText, setThinText] = useState(null);
  const [font_tldr, setFont_tldr] = useState(null);

  useEffect(() => {
    if (data) {
      const textToFetch = data?.[1]?.bio[0].url;
      const fetchText = async () => {
        const fetchedText = await fetchSpecificItem(textToFetch, "fontAbout");

        if (fetchedText) {
          setBoldText(fetchedText?.bold);
          setThinText(fetchedText?.thin);
          setFont_tldr(fetchedText?.font_tldr);
          console.log(fetchedText?.font_tldr);
        }
      };

      fetchText();
    }
  }, [data]);

  if (boldText && thinText && font_tldr) {
    return (
      <div className="aboutTypeOverview">
        <div className="leftText">
          <BoldAndThinText
            boldText={boldText}
            boldWeight={800}
            thinText={thinText}
            amountOfSpace={2}
          />
        </div>
        <div className="rightText">
          {Object?.keys(font_tldr).map((item, index) => (
            <div className="rightTextWrapper" key={index}>
              <BoldAndThinText
                boldText={item.replace(/_/g, " ") + ":"}
                boldWeight={800}
                thinText={
                  Object.values(font_tldr[item]).map((item, index) => (
                    <div key={index} className="tldrListItem">
                      {item}
                    </div>
                  ))
                  // <div className="tldrListItems">{font_tldr[item]}</div>
                }
                amountOfSpace={0}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

const TypeOverviewComponent = ({ data, placeholderData, sectionRef }) => {
  const [overviewImage, setOverviewImage] = useState(null);
  const [activeOverview, setActiveOverview] = useState("CHARACTERISTICS");

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const trackScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    const screenWidthTracker = trackScreenWidth(setScreenWidth);

    window.addEventListener("resize", screenWidthTracker);
    trackScreenWidth();

    return () => window.removeEventListener("resize", screenWidthTracker);
  }, []);

  useEffect(() => {
    if (!data) return;

    const imagesFile = data?.[1]?.fontBlog?.overview_images?.images;
    const imagesArray = {
      clean: [],
      characteristics: [],
    };
    if (imagesFile) {
      imagesFile.forEach((file) => {
        if (file.url.includes("characteristics")) {
          imagesArray.characteristics.push(file);
        } else {
          imagesArray.clean.push(file);
        }
      });

      setOverviewImage(imagesArray);
    } else {
      setActiveOverview("ABOUT");
    }
  }, [data]);

  if (screenWidth > 999) {
    return (
      <SizeContainerComponent sectionColor="black" sectionRef={sectionRef}>
        <div className="typeOverview">
          <div className="titleContainer">
            <H_OneComponent title="Overview" textColor="white" textSize={1} />
          </div>
          <div className="overviewContent">
            <FontVariationButtons
              activeOverview={activeOverview}
              setActiveOverview={setActiveOverview}
              overviewImage={overviewImage}
            />
          </div>
          {activeOverview === "CHARACTERISTICS" && overviewImage && (
            <TypeOverview
              screenWidth={screenWidth}
              overviewImage={overviewImage}
              placeholderImage={placeholderData}
            />
          )}

          {activeOverview === "ABOUT" && (
            <div>
              <AboutTypeOverview data={data} />
            </div>
          )}
        </div>
      </SizeContainerComponent>
    );
  }
};

export default TypeOverviewComponent;
