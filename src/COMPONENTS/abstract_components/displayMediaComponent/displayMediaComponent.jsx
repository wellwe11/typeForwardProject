import "./displayMediaComponent.scss";
import { useEffect, useState } from "react";
import sortType from "../../../functions/sortType";

const PictureComponent = ({ localImages, mediaStyle }) => {
  return (
    <div className="blogImageContainer" style={mediaStyle}>
      <picture>
        <source
          media="(min-width:image/svg+xml 1000px)"
          srcSet={localImages.main}
        />
        <source media="(max-width: 999px)" srcSet={localImages.square} />
        <img src={localImages.main} alt="fallback image" />
      </picture>
    </div>
  );
};

const VideoComponent = ({ localImages, localVideos, mediaStyle }) => {
  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const checkWidth = () => setWindowWidth(window.innerWidth);
    checkWidth();

    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div className="blogImageContainer" style={mediaStyle}>
      <video
        key={windowWidth > 999 ? "main" : "square"}
        preload="none"
        autoPlay
        loop
        muted
        playsInline
        poster={localImages?.square}
      >
        <source
          src={windowWidth > 999 ? localVideos.main : localVideos.square}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

const DisplayMediaComponent = ({ images, videos, mediaStyle }) => {
  const [localImages, setLocalImages] = useState(null);
  const [localVideos, setLocalVideos] = useState(null);

  useEffect(() => {
    if (images) {
      sortType(images, setLocalImages, "square");
    }

    if (videos) {
      sortType(videos, setLocalVideos, "square");
    }
  }, [images, videos]);

  if (localImages || localVideos) {
    return (
      <div className="displayMediaComponent">
        {localVideos && (
          <VideoComponent
            localImages={localImages}
            localVideos={localVideos}
            mediaStyle={mediaStyle}
          />
        )}

        {!localVideos && localImages && (
          <PictureComponent localImages={localImages} mediaStyle={mediaStyle} />
        )}
      </div>
    );
  }
};

export default DisplayMediaComponent;
