import "./abstract.scss";
import { Link } from "react-router-dom";

const BorderWithBorderBox = ({
  children,
  img,
  backgroundColor = "black",
  eventHandler,
  event,
  alt,
  textSize = "h3",
  ExternalImage,
}) => {
  const TextTag = textSize;

  const bgColor = backgroundColor;
  const textColor = bgColor === "black" ? "white" : "black";
  const borderColor =
    bgColor === "black" ? "2px solid white" : " 2px solid black";

  const ExternalImageComp = ExternalImage;
  return (
    <div
      className="imagePart"
      style={{
        "--bg-color": bgColor,
        "--text-color": textColor,
      }}
    >
      <div className="borderOutside" style={{ border: borderColor }}></div>
      <div
        className="borderContainer"
        style={{
          backgroundColor: backgroundColor,
          border: borderColor,
        }}
      >
        {!ExternalImage ? (
          <div className="imgContainer">
            <img
              src={img}
              alt={alt}
              style={{
                filter: backgroundColor === "black" ? "invert(1)" : "none",
                height: !eventHandler ? "100%" : "",
                maxHeight: !eventHandler ? "100%" : "",
              }}
            />
          </div>
        ) : (
          <ExternalImageComp image={img} />
        )}
        {eventHandler === "button" && (
          <button
            onClick={event}
            className="button"
            style={{
              borderTop: borderColor,
            }}
          >
            <span>
              <TextTag
                className="buttonText"
                style={{
                  color: textColor,
                }}
              >
                {children || "please add text"}
              </TextTag>
            </span>
          </button>
        )}

        {eventHandler === "Link" && (
          <Link
            className="button"
            to={`/${event}`}
            style={{
              borderTop: borderColor,
            }}
          >
            <span>
              <TextTag className="buttonText" style={{ color: textColor }}>
                {children}
              </TextTag>
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BorderWithBorderBox;
