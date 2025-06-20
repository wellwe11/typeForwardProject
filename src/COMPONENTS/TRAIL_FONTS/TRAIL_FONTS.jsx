import "./TRAIL_FONTS.scss";
import { EnterEmailAndOrSub, SubscribeInfo } from "../HOME/SUBSCRIBE/SUBSCRIBE";
import ContactUsComp from "../abstract_components/contactUs/contactUs";
import H_OneComponent from "../abstract_components/componentTitle/componentTitle";
import BoldAndThinText from "../abstract_components/boldAndThinText/boldAndThinText";
import SizeContainerComponent from "../abstract_components/sizeContainer/sizeContainerComponent";

const SignUpInfoContent = () => {
  const boldText =
    "Sign up for our mailing list to get access to all of our font files and give them a test run.";
  const thinText =
    "The trial fonts are for testing and evaluation purposes only, so you can make sure they're the perfect fit for your project before committing. And if you need any help or have any questions along the way, don't hesitate to contact us – we're always happy to help our customers find the right font for their needs.";

  return (
    <BoldAndThinText
      boldText={boldText}
      thinText={thinText}
      amountOfSpace={2}
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

const TrailFontsComponent = () => {
  return (
    <SizeContainerComponent sectionColor={"white"}>
      <div className="trailFontContainer">
        <div className="titleContainer">
          <H_OneComponent title={"Download trial fonts"} />
        </div>
        <div className="content">
          <div className="leftContentContainer">
            <SubscribeContent />
          </div>
          <div className="rightContentContainer">
            <SignUpInfoContent />
          </div>
        </div>
      </div>
    </SizeContainerComponent>
  );
};

export default TrailFontsComponent;
