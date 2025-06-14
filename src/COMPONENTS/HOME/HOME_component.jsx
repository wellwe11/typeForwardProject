import React, { useEffect, useMemo, useState } from "react";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";

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
    <div style={{ fontFamily: type?.name }}>
      <h1>{type?.name}</h1>
    </div>
  );
};

const HomeComponent = () => {
  const navLinks = useNavLinks();

  const types = navLinks?.typefaces?.links || [];

  return (
    <div>
      {types.map((type, index) => (
        <div key={index}>
          <TypeFaceComponent type={type} />
        </div>
      ))}
    </div>
  );
};

export default HomeComponent;
