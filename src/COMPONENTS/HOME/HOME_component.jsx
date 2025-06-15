import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";
import fontInfo from "./FONTINFO";

import "./HOME.scss";

const ForwardWelcomeComponent = ({}) => {
  const navLinks = useNavLinks();

  const [fonts, setFonts] = useState();
  const [activeFontIndex, setActiveFontIndex] = useState(2);

  // click container to change font
  // will need to update in future if API-structure changes (since actual font-names include spaces)
  const changeFont = () => {
    if (!fonts) return "Oddval";

    if (activeFontIndex === 4) return setActiveFontIndex(2);

    return setActiveFontIndex((prev) => prev + 1);
  };

  useEffect(() => {
    setFonts(navLinks?.typefaces.links);
  }, [navLinks]);

  console.log(navLinks, fonts);

  const textRef = useRef(null);
  const animationFrame = useRef(null);

  const handleMouseMove = (e) => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);

    animationFrame.current = requestAnimationFrame(() => {
      const x = e.clientX / 30;
      const y = e.clientY * 1.2;

      if (textRef.current) {
        textRef.current.style.fontVariationSettings = `'wght' ${y}, 'wdth' ${x}`;

        if (x > 50) {
          textRef.current.style.fontSize = x;
        }
      }
    });
  };

  useEffect(() => {
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div
      className="forwardWelcome"
      onMouseMove={handleMouseMove}
      onClick={changeFont}
    >
      <div className="welcomeTextContainer">
        <h1
          ref={textRef}
          className="welcomeText"
          style={{
            fontFamily: `${
              !fonts ? "font-Forward" : "font-" + fonts[activeFontIndex]?.name
            }, sans-serif`,
          }}
        >
          forward
        </h1>
      </div>
    </div>
  );
};

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

const TypeButtonExplore = () => {
  // explore takes you to ./typefaces/type
};

const TypeButtonDownload = () => {
  // download takes you to form that includes:
  // "Get *amount of free fonts*, enter email"
  // email field
  // yes i would like to receive emails from typeforward
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
        </div>
      ))}
    </div>
  );
};

const HomeComponent = () => {
  return (
    <div>
      <ForwardWelcomeComponent />
      <TypeComponent />
    </div>
  );
};

export default HomeComponent;
