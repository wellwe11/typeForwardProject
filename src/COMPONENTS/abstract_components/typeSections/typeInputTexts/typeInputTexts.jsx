import { useEffect, useRef, useState } from "react";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import "./typeInputTexts.scss";

const FontVariationButton = ({ children, className, setActiveClass }) => {
  return (
    <div
      onClick={() => setActiveClass(className)}
      className="fontVariationButtonContainer"
    >
      <button onClick={() => setActiveClass(className)} className={className}>
        {children.replace(/_/g, " ")}
      </button>
    </div>
  );
};

const FontVariations = ({ array, setActiveClass }) => {
  return (
    <div className="fontVariationsContainer">
      {array.map((item, index) => (
        <div key={index}>
          <FontVariationButton
            setActiveClass={setActiveClass}
            className={`font${item}`}
          >
            {item}
          </FontVariationButton>
        </div>
      ))}
    </div>
  );
};

const InputWithText = ({ type, text, activeClass }) => {
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
          className={activeClass}
          onChange={handleInput}
          style={{
            color: "black",
            fontFamily: type[0],
          }}
          value={localText}
        />
      </div>
    );
  }
};

const Inputs = ({ texts, type, inputTypes, fonts, freeFonts }) => {
  const [activeClass, setActiveClass] = useState(null);
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

  useEffect(() => {
    const localArray = [];
    if (freeFonts) {
      Object.keys(freeFonts).map((font) => localArray.push(font));
    }

    setFreeFontsNames(localArray);
  }, [fonts, freeFonts]);

  return (
    <div className="inputsContainer">
      <FontVariations array={inputTypes} setActiveClass={setActiveClass} />
      {texts.map((text, index) => {
        const fontTitle = fontTitles[index];
        const isFreeFont = freeFontNames.some((a) => a.includes(fontTitle));

        return (
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
            <InputWithText text={text} type={type} activeClass={activeClass} />
          </div>
        );
      })}
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
          <div className="typeInputTextsComponentContainer">
            <Inputs
              texts={inputInitialTexts}
              type={type}
              inputTypes={inputTypes}
              fonts={fonts}
              freeFonts={freeFonts}
            />
          </div>
        </SizeContainerComponent>
      );
    }
  }
};

export default TypeInputTextsComponent;
