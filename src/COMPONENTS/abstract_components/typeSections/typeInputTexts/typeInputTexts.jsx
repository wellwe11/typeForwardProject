import { useEffect, useRef, useState } from "react";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import "./typeInputTexts.scss";
import H_OneComponent from "../../componentTitle/componentTitle";

const FontVariationButton = ({
  children,
  className,
  setActiveFontStyle,
  activeFontStyle,
}) => {
  return (
    <div
      onClick={() => setActiveFontStyle(className)}
      className={`fontVariationButtonContainer ${
        activeFontStyle.replace("font", "") === children ? "buttonActive" : ""
      }`}
    >
      <button
        onClick={() => setActiveFontStyle(className)}
        className={className}
      >
        <div className="smallDot"></div>
        <div className="smallDot"></div>
        <div className="smallDot"></div>
        <div className="smallDot"></div>
        {children.replace(/_/g, " ")}
      </button>
    </div>
  );
};

const FontVariations = ({ array, activeFontStyle, setActiveFontStyle }) => {
  return (
    <div className="fontVariationsContainer">
      {array.map((item, index) => (
        <div key={index}>
          <FontVariationButton
            setActiveFontStyle={setActiveFontStyle}
            className={`font${item}`}
            activeFontStyle={activeFontStyle}
          >
            {item}
          </FontVariationButton>
        </div>
      ))}
    </div>
  );
};

const InputWithText = ({ type, text, activeFontStyle, fontWeight }) => {
  const [localText, setLocalText] = useState(null);

  useEffect(() => {
    setLocalText(text);
  }, []);

  const handleInput = (t) => {
    const value = t.target.value;
    setLocalText(value);
  };

  if (localText) {
    return (
      <div className="inputWithTextContainer">
        <input
          onChange={handleInput}
          style={{
            color: "black",
            fontFamily: type[0],
            fontVariationSettings: `"wght" ${fontWeight}, ${
              activeFontStyle === "fontITALIC"
                ? `"ital" 1`
                : activeFontStyle === "fontCONDENSED"
                ? `"wdth" 0`
                : activeFontStyle === "fontCONDENSED_ITALIC"
                ? `"ital" 1, "wdth" 0`
                : `"ital" 0`
            }`,
          }}
          value={localText}
        />
      </div>
    );
  }
};

const Inputs = ({ texts, type, inputTypes, fonts, freeFonts }) => {
  const [activeFontStyle, setActiveFontStyle] = useState("fontREGULAR");
  const [freeFontNames, setFreeFontsNames] = useState([]);
  const fontTitles = [
    "Hairline",
    "Thin",
    "Light",
    "Book",
    "Regular",
    "Medium",
    "Semibold",
    "Bold",
    "Heavy",
    "Black",
    "Variable",
  ];

  const fontWeights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 500];

  useEffect(() => {
    const localArray = [];
    if (freeFonts) {
      Object.keys(freeFonts).map((font) => localArray.push(font));
    }

    setFreeFontsNames(localArray);
  }, [fonts, freeFonts]);

  return (
    <div className="inputsContainer">
      <FontVariations
        array={inputTypes}
        setActiveFontStyle={setActiveFontStyle}
        activeFontStyle={activeFontStyle}
      />
      <div className="fontsWrapper">
        {texts.map((text, index) => {
          const fontTitle = fontTitles[index];
          const isFreeFont = freeFontNames.some((a) => a.includes(fontTitle));

          return (
            fontTitle && (
              <div className="fontText" key={index}>
                <div className="fontTitle">
                  {isFreeFont && (
                    <div className="freeContainer">
                      <h3>FREE</h3>
                    </div>
                  )}

                  {fontTitle && (
                    <>
                      <h3
                        style={{ color: "black" }}
                      >{`${type[0]} ${fontTitle}`}</h3>
                    </>
                  )}
                </div>
                <InputWithText
                  text={text}
                  type={type}
                  activeFontStyle={activeFontStyle}
                  fontWeight={fontWeights[index]}
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

const TypeInputTextsComponent = ({ type, data, fontBio }) => {
  if (data) {
    const inputTypes = fontBio?.Family_Overview;
    const inputInitialTexts = data.sections;
    const fonts = type?.[1].fonts;
    const freeFonts = type?.[1].free_Fonts;

    if (inputTypes && inputInitialTexts) {
      return (
        <SizeContainerComponent sectionColor="white">
          <div className="typefacesContainer">
            <div className="topBorder">
              <H_OneComponent
                textColor="black"
                title={"Family Overview"}
                textSize={1}
              />
            </div>
            <div className="typeInputTextsComponentContainer">
              <Inputs
                texts={inputInitialTexts}
                type={type}
                inputTypes={inputTypes}
                fonts={fonts}
                freeFonts={freeFonts}
              />
            </div>
          </div>
        </SizeContainerComponent>
      );
    }
  }
};

export default TypeInputTextsComponent;
