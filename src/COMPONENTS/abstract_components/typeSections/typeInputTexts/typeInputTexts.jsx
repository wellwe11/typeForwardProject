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
        {children.replace(/_/g, " ").toUpperCase()}
      </button>
    </div>
  );
};

const FontVariations = ({ array, activeFontStyle, setActiveFontStyle }) => {
  const buttonObjectKeys = Object.keys(array);
  return (
    <div className="fontVariationsContainer">
      {buttonObjectKeys.map((item, index) => (
        <div key={index}>
          <FontVariationButton
            setActiveFontStyle={setActiveFontStyle}
            className={`${item}`}
            activeFontStyle={activeFontStyle}
          >
            {item}
          </FontVariationButton>
        </div>
      ))}
    </div>
  );
};

const InputWithText = ({ text, type, fontInfo }) => {
  const [localText, setLocalText] = useState(text);

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
            fontVariationSettings: `"wght" ${fontInfo?.wght || 500}, "wdth" ${
              fontInfo?.wdth || 1
            }, "ital" ${fontInfo?.ital}`,
            fontFamily: `${type[0]}`,
          }}
          value={localText}
        />
      </div>
    );
  }
};

const Inputs = ({ texts, type, fonts, freeFonts, fontInfo }) => {
  const [activeFontStyle, setActiveFontStyle] = useState("regular");
  const [freeFontNames, setFreeFontsNames] = useState([]);

  const [fontStyles, setFontStyles] = useState({});
  const doesHaveVariable = Object.keys(type[1].fonts).some((font) =>
    font.includes("Variable")
  );

  const seperateFonts = (arr, setter) => {
    const arrObj = { regular: [] };

    arr.forEach((item) => {
      const splittedName = item.name?.split(" ");

      if (splittedName?.length === 1) {
        arrObj.regular.push(item);
      } else {
        const keyName = splittedName?.slice(1).toString().replace(",", " ");

        if (!arrObj[`${keyName}`] && keyName !== undefined) {
          arrObj[`${keyName}`] = [];
        }

        arrObj[`${keyName}`]?.push(item);
      }
    });

    setter(arrObj);
  };

  useEffect(() => {
    seperateFonts(fontInfo.instances, setFontStyles);
  }, [fontInfo]);

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
        array={fontStyles}
        setActiveFontStyle={setActiveFontStyle}
        activeFontStyle={activeFontStyle}
      />
      <div className="fontsWrapper">
        {fontStyles[activeFontStyle]?.map((text, index) => {
          const fontTitle = text?.name || "Regular";
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
                  text={texts[index]}
                  type={type}
                  fontInfo={text?.coordinates}
                />
              </div>
            )
          );
        })}
        {activeFontStyle === "regular" && (
          <>
            <div className="fontTitle">
              <h3 style={{ color: "black" }}>{`${type[0]} Variable`}</h3>
            </div>

            <InputWithText text={texts[0]} type={type} />
          </>
        )}
      </div>
    </div>
  );
};

const TypeInputTextsComponent = ({ type, data, fontBio, fontInfo }) => {
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
                fontInfo={fontInfo}
              />
            </div>
          </div>
        </SizeContainerComponent>
      );
    }
  }
};

export default TypeInputTextsComponent;
