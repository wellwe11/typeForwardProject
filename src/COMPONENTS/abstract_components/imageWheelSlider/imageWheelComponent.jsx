import "./imageWheelSlider.scss";
import DisplayMediaComponent from "../displayMediaComponent/displayMediaComponent";
import { useEffect, useState } from "react";
import SizeContainerComponent from "../sizeContainer/sizeContainerComponent";
import RoundButton from "../roundButton/roundButton";

const ImageWheelDots = ({ amountOfImages, activeDot, setActiveDot }) => {
  const dots = [];
  for (let i = 0; i < amountOfImages; i++) {
    dots.push(
      <div
        className={`fontInfoImageWheeldot ${
          activeDot === i + 1 ? "activeDot" : ""
        }`}
        onClick={() => setActiveDot(i + 1)}
      />
    );
  }

  return <div className="imageWheelDots">{dots}</div>;
};

const ImageWheelContainer = ({ data }) => {
  const media = Object.entries(data?.fontBlog.media);
  const [activeImage, setActiveImage] = useState(1);
  const [imageHover, setImageHover] = useState(false);
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);

  const handleActiveImage = () => {
    if (activeImage === mediaElements?.length) {
      setActiveImage(1);
    } else {
      setActiveImage((prev) => prev + 1);
    }
  };

  const handlePrevImage = () => {
    console.log("left clicked");
    if (activeImage === 0) {
      setActiveImage(mediaElements?.length);
    } else {
      setActiveImage((prev) => prev - 1);
    }
  };

  const mediaElements = media.map(([index, item]) => {
    return (
      <div
        className="imageWheelImage"
        key={index}
        onMouseEnter={() => setImageHover(true)}
        onMouseLeave={() => setImageHover(false)}
      >
        {item.videos ? (
          <DisplayMediaComponent
            videos={item.videos}
            images={item.images}
            mediaStyle={{
              transition: "opacity 1s ease",
              opacity: +index === activeImage ? "1" : "0",
            }}
          />
        ) : item.images ? (
          <DisplayMediaComponent
            images={item.images}
            mediaStyle={{
              transition: "opacity 0.7s ease",
              opacity: +index === activeImage ? "1" : "0",
            }}
          />
        ) : null}
      </div>
    );
  });

  useEffect(() => {
    if (!imageHover) {
      const timer = setTimeout(() => {
        handleActiveImage();
      }, 3000);

      return () => clearTimeout(timer);
    }
  });

  if (media) {
    return (
      <SizeContainerComponent sectionColor="white">
        <div className="imageWheelContainer">
          <div className="mediaElementsContainer">
            <div className="mediaAndPointers">
              <div
                className="leftSide"
                onClick={handlePrevImage}
                onMouseEnter={() => setLeftHover(true)}
                onMouseLeave={() => setLeftHover(false)}
              >
                <RoundButton hover={leftHover} />
              </div>
              {mediaElements}
              <div
                className="rightSide"
                onClick={handleActiveImage}
                onMouseEnter={() => setRightHover(true)}
                onMouseLeave={() => setRightHover(false)}
              >
                <RoundButton hover={rightHover} />
              </div>
            </div>

            <div className="imageWheelDotsContainer">
              <ImageWheelDots
                amountOfImages={mediaElements?.length}
                activeDot={activeImage}
                setActiveDot={setActiveImage}
              />
              {ImageWheelDots}
            </div>
          </div>
        </div>
      </SizeContainerComponent>
    );
  }
};

export default ImageWheelContainer;
