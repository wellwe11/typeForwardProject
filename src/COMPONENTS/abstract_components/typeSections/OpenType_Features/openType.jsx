import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import "./openType.scss";

import BoldAndThinText from "../../boldAndThinText/boldAndThinText";
import fetchFontStyle from "../getFontStyle";
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

const LeftSection = ({ data, font }) => {
  const fontRepresentations = Object.entries(data.font_Representations);
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

  return (
    <div className="leftSection">
      {fontRepresentations.map(([index, representation]) => {
        return (
          <div className="fontDisplay" key={index}>
            <LeftSpan
              className={"presentation"}
              representation={representation}
              style={{
                opacity: activeTextStyle === 1 ? "0" : "1",
                fontFamily: font[0],
              }}
            />
            <LeftSpan
              className={"presentationNormal"}
              representation={representation}
              style={{
                fontFeatureSettings: `"${representation.style}" 1`,
                opacity: activeTextStyle,
                fontFamily: font[0],
              }}
            />
            <h5 className="info">{index}</h5>
          </div>
        );
      })}
    </div>
  );
};

const OpenTypeComponent = ({ data, font }) => {
  if (data) {
    const thinText = data.openType_Features.thin;
    const boldText = data.openType_Features.bold.replace(
      "REPLACE_ME",
      font[0] + "s"
    );

    return (
      <SizeContainerComponent sectionColor="white">
        <div className="openTypeComponentContainer">
          <div className="titleContainer">
            <H_OneComponent
              title="OpenType Features"
              textColor="black"
              textSize={1}
            />
          </div>
          <div className="openTypesectionsContainer">
            <LeftSection data={data} font={font} />
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
