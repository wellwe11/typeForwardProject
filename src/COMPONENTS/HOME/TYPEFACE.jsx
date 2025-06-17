import { useEffect, useState } from "react";
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

const DownloadForm = ({ type }) => {
  return (
    <div>
      <div>X</div>
      <div>
        <div>
          <h1>Get 2 free fonts</h1>
        </div>

        <div>
          <h4>
            Enter your e-mail to get "typeOne" and "typeTwo" free desktop and
            web fonts with license to use as you wish.
          </h4>
        </div>
        <div>
          <EnterEmailAndOrSub />
        </div>
      </div>
    </div>
  );
};

const TypeComponent = () => {
  const navLinks = useNavLinks();

  const types = navLinks?.typefaces?.links || [];

  return (
    <section className="typeFaceSection">
      <DownloadForm />
      <div className="typeFaceSectionTitle">
        <h1>Typefaces</h1>
      </div>
      <div className="typeFaceSectionContainer">
        {types.map((type, index) => (
          <section className="typeFace">
            <div className="innerWidthContainer" key={index}>
              <TypeFaceComponent type={type} />
              <div className="buyDownloadButtonsContainer">
                <TypeButtonExplore type={types[index].name} />
                <TypeButtonDownload type={types[index].name} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default TypeComponent;
