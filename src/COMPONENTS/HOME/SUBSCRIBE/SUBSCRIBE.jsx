import { useEffect, useState, memo } from "react";
import "./SUBSCRIBE.scss";
import H_OneComponent from "../../abstract_components/componentTitle/componentTitle";

const SubscribeButton = ({ canClick, type, handler }) => {
  return (
    <button className="subscribeButtonContainer" type={type} onClick={handler}>
      <h1 style={{ color: canClick ? "black" : "gray" }}>→</h1>
    </button>
  );
};

export const EmailInput = () => {
  const [inputHover, setInputHover] = useState(false);
  const [submitMail, setSubmitMail] = useState(null);
  const [emailInput, setEmailInput] = useState("");
  const handleInputHover = () => setInputHover(!inputHover);

  const handleInput = (e) => {
    e.preventDefault();
    if (e && !emailInput.includes("@")) {
      return setSubmitMail(false);
    } else {
      setSubmitMail(null);
      setEmailInput("");
    }
  };

  return (
    <div className="inputContainer">
      <div
        className="inputSmallBox"
        style={{
          visibility: inputHover ? "visible" : "",
          border:
            submitMail === false &&
            emailInput.length > 1 &&
            !emailInput.includes("@")
              ? "2px solid red"
              : "",
        }}
      ></div>
      <div
        className="inputSmallBox"
        style={{
          visibility: inputHover ? "visible" : "",
          border:
            submitMail === false &&
            emailInput.length > 1 &&
            !emailInput.includes("@")
              ? "2px solid red"
              : "",
        }}
      ></div>
      <div
        className="inputSmallBox"
        style={{
          visibility: inputHover ? "visible" : "",
          border:
            submitMail === false &&
            emailInput.length > 1 &&
            !emailInput.includes("@")
              ? "2px solid red"
              : "",
        }}
      ></div>
      <div
        className="inputSmallBox"
        style={{
          visibility: inputHover ? "visible" : "",
          border:
            submitMail === false &&
            emailInput.length > 1 &&
            !emailInput.includes("@")
              ? "2px solid red"
              : "",
        }}
      ></div>
      <form>
        <input
          type="email"
          name="email"
          className="input"
          placeholder="Enter your email"
          onFocus={handleInputHover}
          onBlur={handleInputHover}
          onChange={(e) => setEmailInput(e.target.value)}
          value={emailInput}
          style={{
            border:
              submitMail === false &&
              emailInput.length > 1 &&
              !emailInput.includes("@")
                ? "2px solid red"
                : "",
          }}
          onKeyDown={(e) => (e === "enter" ? handleInput(e) : "")}
        />
        <div className="subBtnContainer">
          <SubscribeButton
            type={"submit"}
            handler={handleInput}
            canClick={emailInput.includes("@") ? true : false}
          />
        </div>
      </form>
    </div>
  );
};

export const SubCheck = () => {
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
      <H_OneComponent title={children} textColor="black" />
      <br />
      <EmailInput />
      <SubCheck />
    </div>
  );
};

export const SubscribeInfo = () => {
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

const SubsrcibeComponent = ({ sectionRef }) => {
  return (
    <section
      className="sectionWhite"
      // ref={(el) => (sectionRef.current[3] = el)}
    >
      <div className="subscribeComponentSection">
        <div className="subscribeComponentContainer">
          <div className="innerWidthContainer">
            <div className="enterEmailAndOrSubContainer">
              <EnterEmailAndOrSub>Subscribe</EnterEmailAndOrSub>
            </div>
            <div className="subscribeInfoComponentContainer">
              <SubscribeInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(SubsrcibeComponent);
