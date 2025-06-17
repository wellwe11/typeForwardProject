import { useState } from "react";
import "./SUBSCRIBE.scss";

const EmailInput = () => {
  const [inputHover, setInputHover] = useState(false);
  const handleInputHover = () => setInputHover(!inputHover);

  return (
    <div className="inputContainer">
      <div
        className="inputSmallBox"
        style={{ visibility: inputHover ? "visible" : "" }}
      ></div>
      <div
        className="inputSmallBox"
        style={{ visibility: inputHover ? "visible" : "" }}
      ></div>
      <div
        className="inputSmallBox"
        style={{ visibility: inputHover ? "visible" : "" }}
      ></div>
      <div
        className="inputSmallBox"
        style={{ visibility: inputHover ? "visible" : "" }}
      ></div>
      <input
        type="email"
        name="email"
        className="input"
        placeholder="Enter your email"
        onFocus={handleInputHover}
        onBlur={handleInputHover}
      />
    </div>
  );
};

const SubCheck = () => {
  const [subscribeClicked, setSubscribeClicked] = useState(false);
  const handleSubscribeClicked = () => setSubscribeClicked(!subscribeClicked);
  return (
    <div className="subscribeContainer">
      <button
        className="button"
        type="checkbox"
        onClick={handleSubscribeClicked}
      >
        <div
          className="circle"
          style={{
            height: subscribeClicked ? "12px" : "",
            width: subscribeClicked ? "12px" : "",
          }}
        ></div>
      </button>
      <span>
        <h3 className="subscribeText">
          Yes, I would like to receive emails from Type Forward.
        </h3>
      </span>
    </div>
  );
};

export const EnterEmailAndOrSub = ({ children }) => {
  return (
    <div className="enterInfoContainer">
      <h1 className="title">{children}</h1>
      <EmailInput />
      <SubCheck />
    </div>
  );
};

const SubscribeInfo = () => {
  return (
    <div className="subscribeInfo">
      <div className="subInfoTextContainer">
        <span>
          <h4 className="subInfoText">
            You can unsubscribe at any time by clicking the unsubscribe link
            from the footer of our e-mails. By subscribing, you acknowledge that
            your information will be transferred to Mailchimp for processing.
            Learn more about Mailchimp’s privacy practices{" "}
            <button>
              here↗
              <div className="underline"></div>
            </button>
            . See our Privacy Policy{" "}
            <button>
              here↗
              <div className="underline"></div>
            </button>
            .
          </h4>
        </span>
      </div>
    </div>
  );
};

const SubsrcibeComponent = () => {
  return (
    <section className="subscribeComponentSection">
      <div className="subscribeComponentContainer">
        <div className="innerWidthContainer">
          <EnterEmailAndOrSub>Subscribe</EnterEmailAndOrSub>
          <SubscribeInfo />
        </div>
      </div>
    </section>
  );
};

export default SubsrcibeComponent;
