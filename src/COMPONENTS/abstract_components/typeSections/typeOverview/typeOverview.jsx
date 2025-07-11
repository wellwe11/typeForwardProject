import "./typeOverview.scss";
import { useEffect, useRef, useState } from "react";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import RoundButton from "../../roundButton/roundButton";
import { FontVariationButton } from "../typeInputTexts/typeInputTexts";
import H_OneComponent from "../../componentTitle/componentTitle";

const TypeOverviewComponent = ({ data }) => {
  const [activeOverview, setActiveOverview] = useState("CHARACTERISTICS");
  const [overviewImage, setOverviewImage] = useState(null);
  const [buttonHasBeenHovered, setButtonHasBeenHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const trackScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", trackScreenWidth);
    trackScreenWidth();

    return () => window.removeEventListener("resize", trackScreenWidth);
  }, []);

  const boxViewerRef = useRef();

  const handleMouseDown = () => {
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        const x = e.clientX;

        if (
          boxViewerRef.current &&
          x < screenWidth - screenWidth / 3 + 320 &&
          x > 350
        ) {
          boxViewerRef.current.style.width = `${x - 170}px`;
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

  if (overviewImage) {
    return (
      screenWidth > 999 && (
        <SizeContainerComponent sectionColor="black">
          <div className="typeOverview">
            <div className="titleContainer">
              <H_OneComponent title="Overview" textColor="white" textSize={1} />
            </div>
            <div className="overviewContent">
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
            </div>

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
                  minWidth: !buttonHasBeenHovered ? "7%" : "",
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
          </div>
        </SizeContainerComponent>
      )
    );
  }
};

export default TypeOverviewComponent;
