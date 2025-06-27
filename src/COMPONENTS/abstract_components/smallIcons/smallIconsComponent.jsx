import "./smallIconsComponent.scss";

const icons = import.meta.glob(
  "../../../resourceFolder_typeFoward/extended_assets/socials_icons/*.svg",
  {
    eager: true,
    as: "url",
  }
);

const LinkImagesComponent = ({ sectionColor, data }) => {
  const bgColor = sectionColor === "black" ? "black" : "white";
  const textColor = bgColor === "black" ? "white" : "black";
  const borderColor = bgColor === "black" ? "white" : "black";
  const imageFilterBlack = bgColor === "black" ? "invert(1)" : "invert(0)";
  const imageFilterWhite = bgColor === "white" ? "invert(1)" : "invert(0)";

  if (!data)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  const dataEntries = Object.entries(data);

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
      {icons &&
        dataEntries.map(([index, obj]) => (
          <div className="iconButtonContainer">
            <div className="insideIconButtonContainer">
              <button
                className="iconButton"
                onClick={() => window.open(obj, "_blank")}
              >
                <img
                  src={
                    icons[
                      `../../../resourceFolder_typeFoward/extended_assets/socials_icons/${index}.min.svg`
                    ]
                  }
                  alt=""
                />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LinkImagesComponent;
