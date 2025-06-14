import React, { useEffect, useMemo, useState } from "react";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";
import fontInfo from "./FONTINFO";

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
        src: url('${fontUrl}') format('woff2');
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

  console.log(type);

  return (
    <div className="typeFaceContainer" style={{ fontFamily: type?.name }}>
      <h1 className="typeFaceName">{type?.name}</h1>
      <h3 className="typeFaceDescription">{fontInfo[type?.name]}</h3>
      <div className="fontAvaliableContainer">
        <h4>Fonts: {type.count.length}</h4>
        {/* <h4>Free: {type?.free.length} </h4> */}
        <h4>Free: 2</h4>
      </div>
    </div>
  );
};

const HomeComponent = () => {
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
        </div>
      ))}
    </div>
  );
};

export default HomeComponent;
