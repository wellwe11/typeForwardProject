import "./TRAIL_FONTS.scss";
import { EnterEmailAndOrSub, SubscribeInfo } from "../HOME/SUBSCRIBE/SUBSCRIBE";
import ContactUsComp from "../abstract_components/contactUs/contactUs";
import H_OneComponent from "../abstract_components/componentTitle/componentTitle";

const SignUpInfoContent = () => {
  return (
    <div className="rightContent">
      <span>
        <h3 className="bold">
          Sign up for our mailing list to get access to all of our font files
          and give them a test run.
        </h3>
        <br />
        <br />
        <h3 className="thin">
          The trial fonts are for testing and evaluation purposes only, so you
          can make sure they're the perfect fit for your project before
          committing. And if you need any help or have any questions along the
          way, don't hesitate to contact us – we're always happy to help our
          customers find the right font for their needs.
        </h3>
      </span>
    </div>
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
    <section className="sectionWhite">
      <div className="trailFontsSection">
        <div className="trailFontsContainer">
          <div className="innerWidthContainer">
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
        </div>
      </div>
    </section>
  );
};

export default TrailFontsComponent;
