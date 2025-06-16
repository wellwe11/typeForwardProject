import { useState } from "react";
import "./HOME.scss";

const SubsrcibeComponent = () => {
  const [inputHover, setInputHover] = useState(false);
  const handleInputHover = () => setInputHover(!inputHover);
  const [subscribeClicked, setSubscribeClicked] = useState(false);
  const handleSubscribeClicked = () => setSubscribeClicked(!subscribeClicked);

  console.log(subscribeClicked);

  const subscribeInfo = (
    <div className="subInfoTextContainer">
      <span>
        <h4 className="subInfoText">
          You can unsubscribe at any time by clicking the unsubscribe link from
          the footer of our e-mails. By subscribing, you acknowledge that your
          information will be transferred to Mailchimp for processing. Learn
          more about Mailchimp’s privacy practices{" "}
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
  );

  return (
    <section className="subscribeComponentSection">
      <div className="subscribeComponentContainer">
        <div className="innerWidthContainer">
          <div className="enterInfoContainer">
            <h1 className="title">Subscribe</h1>
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
          </div>
          <div className="subscribeInfo">{subscribeInfo}</div>
        </div>
      </div>
    </section>
  );
};

export default SubsrcibeComponent;
