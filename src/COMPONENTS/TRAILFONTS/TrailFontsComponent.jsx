import "./TRAIL_FONTS.scss";
import { useEffect, useState } from "react";

import { EnterEmailAndOrSub, SubscribeInfo } from "../SUBSCRIBE/SUBSCRIBE";
import ContactUsComp from "../abstract_components/contactUs/contactUs";
import H_OneComponent from "../abstract_components/componentTitle/componentTitle";
import BoldAndThinText from "../abstract_components/boldAndThinText/boldAndThinText";
import SizeContainerComponent from "../abstract_components/sizeContainer/sizeContainerComponent";
import fetchText from "../../functions/importFont";

const SignUpInfoContent = ({ data }) => {
  const [thinText, setThinText] = useState("");
  const [boldText, setBoldText] = useState("");

  useEffect(() => {
    const mdUrl = data.filter((e) => e.includes("bio"));
    const text = mdUrl[0][1][0].url;
    if (mdUrl) {
      fetchText(text, setThinText, setBoldText);
    }
  }, []);

  return (
    <BoldAndThinText
      boldText={boldText}
      thinText={thinText}
      amountOfSpace={2}
      fontColor="black"
    />
  );
};

const SubscribeContent = () => {
  return (
    <div className="leftContent">
      <div className="bottomContent">
        <div className="subscribeContentContainer">
          <h3>Do you want to try our fonts before you buy?</h3>
          <EnterEmailAndOrSub />
        </div>
        <div className="SubscribeInfoContainer">
          <SubscribeInfo />
        </div>
      </div>
      <div className="contactUsContainer">
        <ContactUsComp color={"black"} />
      </div>
    </div>
  );
};

const TrailFontsComponent = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data);
  if (data.TrailFonts) {
    const dataTrailFonts = Object.entries(data?.TrailFonts);
    return (
      <SizeContainerComponent sectionColor={"white"}>
        <div className="trailFontContainer">
          <div className="titleContainer">
            <H_OneComponent title={"Download trial fonts"} textColor="black" />
          </div>
          <div className="content">
            <div className="leftContentContainer">
              <SubscribeContent />
            </div>
            <div className="rightContentContainer">
              <SignUpInfoContent data={dataTrailFonts} />
            </div>
          </div>
        </div>
      </SizeContainerComponent>
    );
  }
};

export default TrailFontsComponent;
