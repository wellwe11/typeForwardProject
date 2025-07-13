import "./typeOverview.scss";
import { useEffect, useRef, useState } from "react";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import RoundButton from "../../roundButton/roundButton";
import { FontVariationButton } from "../typeInputTexts/typeInputTexts";
import H_OneComponent from "../../componentTitle/componentTitle";
import fetchSpecificItem from "../../../../functions/fetchSpecificItem";

const TypeOverview = ({ screenWidth, overviewImage }) => {
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
            src={overviewImage.characteristics[0].url}
            alt=""
            draggable="false"
          />
        </div>
      </div>
      <div className="cleanContainer">
        <img
          className="typeOverviewClean"
          src={overviewImage.clean[0].url}
          alt=""
          draggable="false"
        />
      </div>
    </div>
  );
};

const FontVariationButtons = ({ activeOverview, setActiveOverview }) => {
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
};

const AboutTypeOverview = ({ data }) => {
  const [textBold, setTextBold] = useState(null);
  const [textThin, setTextThin] = useState(null);
  useEffect(() => {
    if (data) {
      const textToFetch = data?.[1]?.bio[0].url;
      const fetchText = async () => {
        const fetchedText = await fetchSpecificItem(textToFetch, "fontAbout");

        if (fetchedText) {
          setTextBold(fetchedText?.bold);
          setTextThin(fetchedText?.thin);
        }
      };

      fetchText();
    }
  }, [data]);

  console.log(textBold, textThin);

  //   fetchSpecificItem(data)
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

const TypeOverviewComponent = ({ data }) => {
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

    const imagesFile = data?.[1].fontBlog.overview_images.images;
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
    }
  }, [data]);

  if (overviewImage && screenWidth > 999) {
    return (
      <SizeContainerComponent sectionColor="black">
        <div className="typeOverview">
          <div className="titleContainer">
            <H_OneComponent title="Overview" textColor="white" textSize={1} />
          </div>
          <div className="overviewContent">
            <FontVariationButtons
              activeOverview={activeOverview}
              setActiveOverview={setActiveOverview}
            />
          </div>
          {activeOverview === "CHARACTERISTICS" && (
            <TypeOverview
              screenWidth={screenWidth}
              overviewImage={overviewImage}
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
