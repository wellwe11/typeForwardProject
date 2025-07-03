import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import "./openType.scss";

import BoldAndThinText from "../../boldAndThinText/boldAndThinText";
import fetchFontStyle from "../getFontStyle";
import H_OneComponent from "../../componentTitle/componentTitle";

const OpenTypeComponent = ({ data, font }) => {
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

  if (data) {
    const thinText = data.openType_Features.thin;
    const boldText = data.openType_Features.bold;

    const fontRepresentations = Object.entries(data.font_Representations);

    console.log(font);
    fetchFontStyle(font);

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
            <div className="leftSection">
              {fontRepresentations.map(([index, representation]) => {
                return (
                  <div className="fontDisplay" key={index}>
                    <span
                      className="presentationNormal"
                      style={{
                        opacity: activeTextStyle === 1 ? "0" : "1",
                        fontFamily: font[0],
                      }}
                    >
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

                    <span
                      className="presentation"
                      style={{
                        fontFeatureSettings: `"${representation.style}" 1`,
                        opacity: activeTextStyle,
                        fontFamily: font[0],
                      }}
                    >
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

                    <h5 className="info">{index}</h5>
                  </div>
                );
              })}
            </div>
            <div className="rightSection">
              <BoldAndThinText
                thinText={thinText}
                boldText={boldText}
                fontColor="black"
              />
            </div>
          </div>
        </div>
      </SizeContainerComponent>
    );
  }
};

export default OpenTypeComponent;
