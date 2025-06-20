import "./smallIconsComponent.scss";

import dribblbleIcon from "../../../resourceFolder_typeFoward/assets/images/dribbble.min.svg";
import myFontsIcon from "../../../resourceFolder_typeFoward/assets/images/myfonts.min.svg";
import behanceIcon from "../../../resourceFolder_typeFoward/assets/images/behance.min.svg";
import instagramIcon from "../../../resourceFolder_typeFoward/assets/images/instagram.min.svg";

const LinkImagesComponent = ({ sectionColor }) => {
  const bgColor = sectionColor === "black" ? "black" : "white";
  const textColor = bgColor === "black" ? "white" : "black";
  const borderColor = bgColor === "black" ? "white" : "black";
  const imageFilterBlack = bgColor === "black" ? "invert(1)" : "invert(0)";
  const imageFilterWhite = bgColor === "white" ? "invert(1)" : "invert(0)";

  return (
    <div
      className="linkImagesContainer"
      style={{
        "--bgColor": bgColor,
        "--textColor": textColor,
        "--borderColor": borderColor,
        "--filterColorBlack": imageFilterBlack,
        "--filterColorWhite": imageFilterWhite,
      }}
    >
      <div className="iconButtonContainer">
        <div className="insideIconButtonContainer">
          <button
            className="iconButton"
            onClick={() =>
              window.open(
                "https://www.fontspring.com/foundry/type-forward?cjdata=MXxZfDB8WXww&cjevent=dbec129f4b9a11f083f302520a18ba73&utm_source=cj&utm_medium=affiliate",
                "_blank"
              )
            }
          >
            <img src={myFontsIcon} alt="" />
          </button>
        </div>
      </div>
      <div className="iconButtonContainer">
        <div className="insideIconButtonContainer">
          <button
            className="iconButton"
            onClick={() =>
              window.open("https://www.behance.net/typeforward", "_blank")
            }
          >
            <img src={behanceIcon} alt="" />
          </button>
        </div>
      </div>
      <div className="iconButtonContainer">
        <div className="insideIconButtonContainer">
          <button
            className="iconButton"
            onClick={() =>
              window.open("https://www.instagram.com/type_forward/#", "_blank")
            }
          >
            <img src={instagramIcon} alt="" />
          </button>
        </div>
      </div>
      <div className="iconButtonContainer">
        <div className="insideIconButtonContainer">
          <button
            className="iconButton"
            onClick={() =>
              window.open("https://dribbble.com/typeforward", "_blank")
            }
          >
            <img src={dribblbleIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkImagesComponent;
