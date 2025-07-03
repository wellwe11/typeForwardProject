import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";
import "./openType.scss";

import BoldAndThinText from "../../boldAndThinText/boldAndThinText";
import fetchFontStyle from "../getFontStyle";

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

  console.log(activeTextStyle);
  if (data) {
    const thinText = data.openType_Features.thin;
    const boldText = data.openType_Features.bold;

    const fontRepresentations = Object.entries(data.font_Representations);

    console.log(font);
    fetchFontStyle(font);

    return (
      <SizeContainerComponent sectionColor="white">
        <div className="openTypeComponentContainer">
          <div className="leftSection">
            {fontRepresentations.map(([index, representation]) => {
              return (
                <div className="fontDisplay" key={index}>
                  <div className="presentationNormal">
                    <h1
                      className="presentation"
                      style={{
                        opacity: activeTextStyle === 1 ? "0" : "1",
                        fontFamily: font[0],
                      }}
                    >
                      <ReactMarkdown>{representation?.text}</ReactMarkdown>
                    </h1>
                  </div>
                  <h1
                    className="presentation"
                    style={{
                      fontFeatureSettings: `"${representation.style}" 1`,
                      opacity: activeTextStyle,
                      fontFamily: font[0],
                    }}
                  >
                    <ReactMarkdown>{representation?.text}</ReactMarkdown>
                  </h1>
                  <h4 className="info">{index}</h4>
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
        <h1>hello</h1>
      </SizeContainerComponent>
    );
  }
};

export default OpenTypeComponent;
