import { useEffect, useRef, useState } from "react";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import "./typeInputTexts.scss";
import H_OneComponent from "../../componentTitle/componentTitle";
import fetchSpecificItem from "../../../../functions/fetchSpecificItem";
import addSpaceBeforeCaps from "../../../../functions/addSpaceBeforeCaps";
import fetchFontStyle from "../getFontStyle";

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
  // const buttonObjectKeys = Object.keys(array);

  if (array) {
    return (
      <div className="fontVariationsContainer">
        {array?.map((item, index) => (
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
  }
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
              fontInfo?.wdth
            }, "ital" ${fontInfo?.ital}`,
            fontFamily: `${type[0]}`,
          }}
          value={localText}
        />
      </div>
    );
  }
};

const Inputs = ({
  texts,
  type,
  fonts,
  freeFonts,
  fontInfo,
  fontVariationMd,
}) => {
  const [activeFontStyle, setActiveFontStyle] = useState("regular");
  const [freeFontNames, setFreeFontsNames] = useState([]);

  const [fontStyles, setFontStyles] = useState({});

  const seperateFonts = (arr, setter) => {
    const arrObj = { regular: [] };

    arr.forEach((item) => {
      const splittedName = item.name?.toLowerCase()?.split(" ");

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
    if (fontInfo?.instances) {
      seperateFonts(fontInfo.instances, setFontStyles);
    }
  }, [fontInfo]);

  useEffect(() => {
    const localArray = [];
    if (freeFonts) {
      Object.keys(freeFonts).map((font) => localArray.push(font));
    }

    setFreeFontsNames(localArray);
  }, [fonts, freeFonts]);

  if (fontInfo) {
    const doesHaveVariable = Object?.keys(type?.[1].fonts).some((font) =>
      font.includes("Variable")
    );

    return (
      <div className="inputsContainer">
        <FontVariations
          array={fontVariationMd}
          setActiveFontStyle={setActiveFontStyle}
          activeFontStyle={activeFontStyle}
        />

        <div className="fontsWrapper">
          {doesHaveVariable && (
            <>
              {fontStyles[activeFontStyle]?.map((text, index) => {
                const fontTitle = text?.name || "Regular";
                const isFreeFont = freeFontNames.some((a) =>
                  a.includes(fontTitle)
                );

                return (
                  fontTitle && (
                    <div className="fontText" key={index}>
                      <div className="fontTitle">
                        {isFreeFont && (
                          <div className="freeContainer">
                            <h3>FREE</h3>
                          </div>
                        )}
                        <h3
                          style={{ color: "black" }}
                        >{`${type[0]} ${fontTitle}`}</h3>
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
            </>
          )}
        </div>
      </div>
    );
  }
};

const StaleInput = ({ font, index, texts }) => {
  console.log(index);

  const fetchFontStyle = (type) => {
    if (!type) return;

    const fontEntries = Object.entries(type?.[1]);
    const style = document.createElement("style");
    style.id = `dynamic-font-${type?.[0]}`;
    style.innerHTML = `
      @font-face {
        font-family: '${type?.[0]}';
        src: url('${fontEntries?.[0]?.[1]?.url}');
        font-weight: normal;
        font-style: normal;
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById(`dynamic-font-${type[0]}`);
      if (existing) document.head.removeChild(existing);
    };
  };

  useEffect(() => {
    fetchFontStyle(font);
  }, []);

  return (
    <div>
      <InputWithText text={texts[index]} type={font} />
    </div>
  );
};

const StaleFontVariation = ({ fontData, texts }) => {
  if (fontData) {
    const fontVariations = Object.entries(fontData?.[1]?.fonts);
    return (
      <div>
        {fontVariations.map(([key, object], index) => (
          <div>
            <div>
              <h1 style={{ color: "black" }}>
                {addSpaceBeforeCaps(key.replace(/_/g, " "))}
              </h1>
            </div>
            <StaleInput font={[key, object]} index={index} texts={texts} />
          </div>
        ))}
      </div>
    );
  }
};

const TypeInputTextsComponent = ({ type, data, fontInfo }) => {
  const [fontVariationMd, setFontVariationMd] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const fontVariationButtonsMd = await fetchSpecificItem(
        type[1]?.fontBlog.bio[0].url,
        "family_overview"
      );

      if (fontVariationButtonsMd) {
        setFontVariationMd(fontVariationButtonsMd);
      }
    };

    fetchItems();
  }, []);

  if (data) {
    const inputInitialTexts = data.sections;
    const fonts = type?.[1].fonts;
    const freeFonts = type?.[1].free_Fonts;

    if (inputInitialTexts) {
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
              {fontVariationMd?.length > 1 ? (
                <Inputs
                  fontVariationMd={fontVariationMd}
                  texts={inputInitialTexts}
                  type={type}
                  fonts={fonts}
                  freeFonts={freeFonts}
                  fontInfo={fontInfo}
                />
              ) : (
                <StaleFontVariation fontData={type} texts={inputInitialTexts} />
              )}
            </div>
          </div>
        </SizeContainerComponent>
      );
    }
  }
};

export default TypeInputTextsComponent;
