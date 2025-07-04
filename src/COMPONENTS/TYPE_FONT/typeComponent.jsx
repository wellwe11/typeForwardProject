import "./typeComponent.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchWholeMd from "../../functions/fetchWholeMd";
import TypeHeader from "../abstract_components/typeSections/typeTopSection/typeSection";
import ImageWheelContainer from "../abstract_components/imageWheelSlider/imageWheelComponent";
import OpenTypeComponent from "../abstract_components/typeSections/OpenType_Features/openType";
import TypeInputTextsComponent from "../abstract_components/typeSections/typeInputTexts/typeInputTexts";

const Specific_TypeComponent = ({ data }) => {
  // font name
  const [typeName, setTypeName] = useState(null);
  const { hash } = useLocation();

  // unique types properties. Each type has a few variation of information.
  const [typeObject, setTypeObject] = useState(null);

  // foundation-file for each font
  const [mdFile, setMdFile] = useState(null);

  const [fontBio, setFontBio] = useState(null);

  const [customTypeEntry, setCustomTypeEntry] = useState(null);

  console.log(mdFile, typeObject, typeName);

  useEffect(() => {
    const mdPath = data?.typefaces?.bio?.[0]?.url;

    if (!mdPath) return;

    const fetchMd = async () => {
      const md = await fetchWholeMd(mdPath);

      setMdFile(md);
    };
    fetchMd();
  }, []);

  useEffect(() => {
    if (!hash) return;

    const typeNameCleaned = hash.replace(/#/g, "");
    if (typeNameCleaned) {
      setTypeName(typeNameCleaned);
    }
  }, []);

  useEffect(() => {
    if (!typeName) return;

    setTypeObject(data.typefaces.fonts[typeName]);
  }, [typeName]);

  useEffect(() => {
    if (!customTypeEntry) return;

    const getWholeBio = async () => {
      const fontBlogBio = await fetchWholeMd(
        customTypeEntry?.[1]?.fontBlog.bio[0].url
      );
      setFontBio(fontBlogBio);
    };
    getWholeBio();
  }, [customTypeEntry]);

  useEffect(() => {
    if (mdFile && typeObject) setCustomTypeEntry([typeName, typeObject]);
  }, [mdFile, typeObject]);

  if (customTypeEntry) {
    return (
      <div className="specific_TypeComponent">
        <TypeHeader type={customTypeEntry} artists={fontBio?.artists} />
        <ImageWheelContainer data={typeObject} />
        <OpenTypeComponent data={mdFile} font={customTypeEntry} />
        <TypeInputTextsComponent
          data={mdFile}
          type={customTypeEntry}
          fontBio={fontBio}
        />
      </div>
    );
  }
};

export default Specific_TypeComponent;
