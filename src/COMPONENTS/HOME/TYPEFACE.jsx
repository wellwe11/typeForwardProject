import { useEffect, useState } from "react";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";
import fontInfo from "./FONTINFO";
import { Link } from "react-router-dom";

import "./HOME.scss";

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

const TypeButtonDownload = ({ type }) => {
  // download takes you to form that includes:
  // "Get *amount of free fonts*, enter email"
  // email field
  // yes i would like to receive emails from typeforward
  return (
    <div className="typeButtonDownloadContainer">
      <button>
        <span>
          <h3 className="buttonFont">{"Download"}</h3>
        </span>
      </button>
    </div>
  );
};

const TypeComponent = () => {
  const navLinks = useNavLinks();

  const types = navLinks?.typefaces?.links || [];

  return (
    <div className="typeFaceSection">
      <div className="typeFaceSectionTitle">
        <h1>Typefaces</h1>
      </div>
      {types.map((type, index) => (
        <div className="typeFaceComponent" key={index}>
          <TypeFaceComponent type={type} />
          <div className="buyDownloadButtonsContainer">
            <TypeButtonExplore type={types[index].name} />
            <TypeButtonDownload type={types[index].name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TypeComponent;
