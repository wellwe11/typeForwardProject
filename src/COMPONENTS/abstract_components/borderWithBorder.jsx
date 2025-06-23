import "./abstract.scss";
import { Link } from "react-router-dom";

const BorderWithBorderBox = ({
  children,
  img,
  backgroundColor = "black",
  button,
  event,
  showLink,
  linkTo,
  alt,
  textSize,
}) => {
  const TextTag = textSize;

  const bgColor = backgroundColor;
  const textColor = bgColor === "black" ? "white" : "black";
  const borderColor =
    bgColor === "black" ? "2px solid white" : " 2px solid black";

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
        <img
          src={img}
          alt={alt}
          style={{ filter: backgroundColor === "black" ? "invert(1)" : "none" }}
        />
        {button && (
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
                {children}
              </TextTag>
            </span>
          </button>
        )}
        {showLink && (
          <Link
            className="button"
            to={`./${linkTo}`}
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
