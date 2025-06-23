import { useEffect, useRef, useState } from "react";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";
import fontInfo from "./FONTINFO";
import { Link } from "react-router-dom";

import "./HOME.scss";
import SubsrcibeComponent, { EnterEmailAndOrSub } from "./SUBSCRIBE/SUBSCRIBE";
import SizeContainerComponent from "../abstract_components/sizeContainer/sizeContainerComponent";

const TypeFaceComponent = ({ type, handleDisplayForm }) => {
  useEffect(() => {
    if (!type[0] || !type[1]) return;

    const style = document.createElement("style");
    style.id = `dynamic-font-${type?.[0]}`;
    style.innerHTML = `
      @font-face {
        font-family: '${type?.[0]}';
        src: url('${type?.[1]?.fonts?.[0]?.url}');
        font-weight: normal;
        font-style: normal;
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById(`dynamic-font-${type[0]}`);
      if (existing) document.head.removeChild(existing);
    };
  }, [type]);

  function addSpaceBeforeCaps(text) {
    return text.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  console.log(type);

  return (
    <div className="typeFaceContainer" style={{ fontFamily: type[0] }}>
      <h1 className="typeFaceName">{addSpaceBeforeCaps(type[0])}</h1>
      <h3 className="typeFaceDescription">{fontInfo[type[0]]}</h3>
      <div className="fontAvaliableContainer">
        <Link to={`./typefaces/${type[0]}`} className="fontInfoBtn">
          <h3 className="fontInfo">{type[1].fonts?.length} FONTS</h3>
          <div className="fontUnderline"></div>
        </Link>
        {/* <h4>Free: {type?.free.length} </h4> */}
        <button className="fontInfoBtn" onClick={handleDisplayForm}>
          <h3 className="fontInfo">{type[1].free_Fonts?.length} FREE</h3>
          <div className="fontUnderline"></div>
        </button>
      </div>
    </div>
  );
};

const TypeButtonExplore = ({ type }) => {
  // explore takes you to ./typefaces/type
  return (
    <div className="typeButtonBuyContainer">
      <Link to={`./typefaces/${type}`}>
        <span>
          <h3 className="buttonFont">{"Explore"}</h3>
        </span>
      </Link>
    </div>
  );
};

const TypeButtonDownload = ({ type, handleDisplayForm }) => {
  // download takes you to form that includes:
  // "Get *amount of free fonts*, enter email"
  // email field
  // yes i would like to receive emails from typeforward
  return (
    <div className="typeButtonDownloadContainer">
      <button onClick={handleDisplayForm}>
        <span>
          <h3 className="buttonFont">{"Download"}</h3>
        </span>
      </button>
    </div>
  );
};

const DownloadForm = ({ type, displayForm, setDisplayForm, index }) => {
  const formRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (displayForm !== index) return;

      if (formRef.current && !formRef.current.contains(event.target)) {
        setDisplayForm(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [displayForm, index, setDisplayForm]);

  return (
    <div
      className="downloadFormContainer"
      style={{
        visibility: displayForm === index ? "visible" : "hidden",
        opacity: displayForm === index ? "1" : "0",
      }}
    >
      <div
        className="formIsVisible"
        style={{
          opacity: displayForm === index ? "1" : "0",
        }}
      ></div>
      <div className="outContainerStyle">
        <div className="innerContainer" ref={formRef}>
          <div className="closeContainer">
            <button onClick={() => setDisplayForm(null)}>X</button>
          </div>
          <div className="contentContainer">
            <div className="titleContainer">
              <h1 className="title">Get 2 free fonts</h1>
            </div>
            <div className="subinfoContainer">
              <h4 className="subinfo">
                {`Enter your e-mail to get ${type[1].free_Fonts[0].name} ${
                  type[1].free_Fonts[3]?.name
                    ? "and " + type[1].free_Fonts[3]?.name
                    : ""
                } free desktop and web fonts with license to use as you wish.`}
              </h4>
            </div>
            <div className="enterEmailContainer">
              <EnterEmailAndOrSub />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TypeComponent = ({ sectionRef, data }) => {
  const [displayForm, setDisplayForm] = useState(null);
  const handleDisplayForm = (i) => setDisplayForm(i);

  const [fonts, setFonts] = useState();
  const navLinks = useNavLinks();

  const types = navLinks?.typefaces?.links || [];

  useEffect(() => {
    if (Object.keys(data)?.length > 0) {
      setFonts(Object.entries(data?.typefaces?.fonts));
    }
  }, [data]);

  console.log(fonts);

  useEffect(() => {
    if (displayForm !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [displayForm]);

  return (
    <section
      className="sectionWhite"
      ref={(el) => (sectionRef.current[1] = el)}
    >
      <div className="typeFaceSection">
        <div className="typeFaceSectionContainer">
          <div className="typeFaceSectionTitle">
            <h1>Typefaces</h1>
          </div>
          {fonts &&
            fonts.map((type, index) => (
              <section className="typeFace" key={index}>
                <DownloadForm
                  type={type}
                  displayForm={displayForm}
                  setDisplayForm={setDisplayForm}
                  index={index}
                />
                <div className="innerWidthContainer" key={index}>
                  <TypeFaceComponent
                    type={type}
                    handleDisplayForm={() => handleDisplayForm(index)}
                  />
                  <div className="buyDownloadButtonsContainer">
                    <TypeButtonExplore type={type[0]} />
                    <TypeButtonDownload
                      type={type[0]}
                      handleDisplayForm={() => handleDisplayForm(index)}
                    />
                  </div>
                </div>
              </section>
            ))}
        </div>
      </div>
    </section>
  );
};

export default TypeComponent;
