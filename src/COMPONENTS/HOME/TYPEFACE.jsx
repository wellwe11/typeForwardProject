import { useEffect, useRef, useState } from "react";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";
import fontInfo from "./FONTINFO";
import { Link } from "react-router-dom";

import "./HOME.scss";
import SubsrcibeComponent, { EnterEmailAndOrSub } from "./SUBSCRIBE/SUBSCRIBE";

const TypeFaceComponent = ({ type }) => {
  const [fontUrl, setFontUrl] = useState(null);

  useEffect(() => {
    if (!type?.importers || !type.importers.length) return;

    const importFn = async () => {
      const fontFile = await type.importers[0]();

      const url = fontFile.default || fontFile;
      setFontUrl(url);
    };

    importFn();
  }, [type]);

  useEffect(() => {
    if (!fontUrl || !type?.name) return;

    const style = document.createElement("style");
    style.id = `dynamic-font-${type.name}`;
    style.innerHTML = `
      @font-face {
        font-family: '${type.name}';
        src: url('${fontUrl}');
        font-weight: normal;
        font-style: normal;
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById(`dynamic-font-${type.name}`);
      if (existing) document.head.removeChild(existing);
    };
  }, [fontUrl, type?.name]);

  function addSpaceBeforeCaps(text) {
    return text.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  return (
    <div className="typeFaceContainer" style={{ fontFamily: type?.name }}>
      <h1 className="typeFaceName">{addSpaceBeforeCaps(type?.name)}</h1>
      <h3 className="typeFaceDescription">{fontInfo[type?.name]}</h3>
      <div className="fontAvaliableContainer">
        <h4>Fonts: {type.count?.length}</h4>
        {/* <h4>Free: {type?.free.length} </h4> */}
        <h4>Free: 2</h4>
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
                {`Enter your e-mail to get ${type?.name} and ${type?.name} free desktop and
              web fonts with license to use as you wish.`}
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

const TypeComponent = () => {
  const [displayForm, setDisplayForm] = useState(null);
  const handleDisplayForm = (i) => setDisplayForm(i);
  const navLinks = useNavLinks();

  const types = navLinks?.typefaces?.links || [];

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
    <section className="typeFaceSection">
      <div className="typeFaceSectionTitle">
        <h1>Typefaces</h1>
      </div>
      <div className="typeFaceSectionContainer">
        {types.map((type, index) => (
          <section className="typeFace" key={index}>
            <DownloadForm
              type={type}
              displayForm={displayForm}
              setDisplayForm={setDisplayForm}
              index={index}
            />
            <div className="innerWidthContainer" key={index}>
              <TypeFaceComponent type={type} />
              <div className="buyDownloadButtonsContainer">
                <TypeButtonExplore type={types[index].name} />
                <TypeButtonDownload
                  type={types[index].name}
                  handleDisplayForm={() => handleDisplayForm(index)}
                />
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default TypeComponent;
