import "./typeComponent.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import opentype from "opentype.js";

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

  const [fontInfo, setFontInfo] = useState(null);

  useEffect(() => {
    const mdPath = data?.Typefaces?.bio?.[0]?.url;

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

    setTypeObject(data.Typefaces.fonts[typeName]);
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

  useEffect(() => {
    if (!data) return;

    const path = data?.Typefaces?.fonts.Bion.fonts.BionVariableVF[0].url;

    opentype.load(path, (err, font) => {
      if (err) {
        console.error("Font could not be loaded:", err);
        setFontInfo({ error: "Font could not be loaded." });
        return;
      }

      const fvar = font.tables.fvar;
      if (!fvar) {
        setFontInfo({ error: "Font is not variable or no fvar table found." });
        return;
      }

      // Extract axes info
      const axes = fvar.axes.map((axis) => ({
        tag: axis.tag,
        name: axis.name.en,
        minValue: axis.minValue,
        defaultValue: axis.defaultValue,
        maxValue: axis.maxValue,
      }));

      // Extract named instances info
      const instances = fvar.instances.map((inst) => ({
        name: inst.name.en,
        coordinates: inst.coordinates,
      }));

      const names = font.names;

      setFontInfo({ axes, instances, designer: names.designer?.en || "N/A" });
    });
  }, [data]);

  console.log(fontInfo);

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
          fontInfo={fontInfo}
        />
      </div>
    );
  }
};

export default Specific_TypeComponent;
