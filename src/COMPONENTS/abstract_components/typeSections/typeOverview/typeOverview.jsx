import "./typeOverview.scss";
import { useEffect, useRef, useState } from "react";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import RoundButton from "../../roundButton/roundButton";
import { FontVariationButton } from "../typeInputTexts/typeInputTexts";

const TypeOverviewComponent = ({ data }) => {
  const [activeOverview, setActiveOverview] = useState("characteristics");
  const [overviewImage, setOverviewImage] = useState(null);
  const [buttonHasBeenHovered, setButtonHasBeenHovered] = useState(false);

  const boxViewerRef = useRef();

  const handleMouseDown = () => {
    let animationFrameId = null;

    const handleMouseMove = (e) => {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        const x = e.clientX - 220;
        if (boxViewerRef.current && x < 1000 && x > 80) {
          boxViewerRef.current.style.minWidth = `${x}px`;
        }
        console.log(x);
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
      <SizeContainerComponent sectionColor="black">
        <div className="typeOverview">
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
          <div
            className="boxHoverViewerContainer"
            onMouseEnter={() => setButtonHasBeenHovered(true)}
          >
            <div
              className="boxHoverViewer"
              style={{
                animation: !buttonHasBeenHovered
                  ? "hoverMe 2s infinite ease-in-out"
                  : "",
                minWidth: buttonHasBeenHovered ? "7%" : "",
              }}
              ref={boxViewerRef}
              onMouseDown={handleMouseDown}
            >
              <div className="arrowRight">
                <RoundButton />
              </div>
              <img
                className="typeOverviewCLean"
                src={overviewImage.characteristics[0].url}
                alt=""
                draggable="false"
              />
            </div>
          </div>
          <div className="imagesContainer">
            <img
              className="typeOverviewCharacteristics"
              src={overviewImage.clean[0].url}
              alt=""
              draggable="false"
            />
          </div>
        </div>
      </SizeContainerComponent>
    );
  }
};

export default TypeOverviewComponent;
