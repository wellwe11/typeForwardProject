import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import "./openType.scss";

import BoldAndThinText from "../../boldAndThinText/boldAndThinText";
import H_OneComponent from "../../componentTitle/componentTitle";

const LeftSpan = ({ representation, style, className }) => {
  return (
    <span className={className} style={style}>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => (
            <h5 className="presentationText" {...props} />
          ),
        }}
      >
        {representation?.text}
      </ReactMarkdown>
    </span>
  );
};

const LeftSection = ({ data, font, fontInfo }) => {
  const [displayableFontFeatures, setDisplayableFontFeatures] = useState(null);

  // example-texts font features
  const fontFeatures = fontInfo?.fontFeatures;

  // example-texts which will display different font-changes
  const fontRepresentations = Object.entries(data.font_Representations);

  const fintFontRepresentations = () => {
    const fontRepresentationsStyle = fontFeatures?.map((e) => e?.tag);

    const filteredFontFeatures = fontRepresentations.filter((item) =>
      fontRepresentationsStyle?.includes(item[1].style)
    );

    if (filteredFontFeatures) {
      setDisplayableFontFeatures(filteredFontFeatures);
    }
  };

  useEffect(() => {
    if (fontInfo) {
      fintFontRepresentations();
    }
  }, [fontInfo]);

  const [activeTextStyle, setActiveTextStyle] = useState(null);

  useEffect(() => {
    const timerFunction = () => {
      const timer = setTimeout(() => {
        if (activeTextStyle === 0) setActiveTextStyle(1);
        if (activeTextStyle === 1) setActiveTextStyle(0);
      }, 2000);
      return () => clearTimeout(timer);
    };

    timerFunction();
  }, [activeTextStyle]);

  useEffect(() => {
    setActiveTextStyle(0);
  }, []);

  if (displayableFontFeatures) {
    return (
      <div className="leftSection">
        {displayableFontFeatures.map(([name, representation], index) => {
          return (
            <div className="fontDisplay" key={name}>
              <LeftSpan
                className={"presentation"}
                representation={representation}
                style={{
                  opacity: activeTextStyle === 1 ? "0" : "1",
                  fontFamily: font[0],
                  fontFeatureSettings: `"${representation?.style}" 0`,
                }}
              />
              <LeftSpan
                className={"presentationNormal"}
                representation={representation}
                style={{
                  opacity: activeTextStyle,
                  fontFamily: font[0],
                  fontFeatureSettings: `"${representation?.style}" 1`,
                }}
              />
              <h5 className="info">{`${
                /\d/.test(representation?.style)
                  ? representation?.style + " -"
                  : ""
              }  ${name}`}</h5>
            </div>
          );
        })}
      </div>
    );
  }
};

const OpenTypeComponent = ({ data, font, fontInfo, sectionRef }) => {
  if (data) {
    const thinText = data.openType_Features.thin;
    const boldText = data.openType_Features.bold.replace(
      "REPLACE_ME",
      font[0] + "s"
    );

    return (
      <SizeContainerComponent sectionColor="white" sectionRef={sectionRef}>
        <div className="openTypeComponentContainer">
          <div className="titleContainer">
            <H_OneComponent
              title="OpenType Features"
              textColor="black"
              textSize={1}
            />
          </div>
          <div className="openTypesectionsContainer">
            <LeftSection data={data} font={font} fontInfo={fontInfo} />
            <div className="rightSection">
              <div className="rightText">
                <BoldAndThinText
                  thinText={thinText}
                  boldText={boldText}
                  fontColor="black"
                />
              </div>
            </div>
          </div>
        </div>
      </SizeContainerComponent>
    );
  }
};

export default OpenTypeComponent;
