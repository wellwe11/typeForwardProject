import "./typeComponent.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import opentype from "opentype.js";

import fetchWholeMd from "../../functions/fetchWholeMd";
import TypeHeader from "../abstract_components/typeSections/typeTopSection/typeSection";
import ImageWheelContainer from "../abstract_components/imageWheelSlider/imageWheelComponent";
import OpenTypeComponent from "../abstract_components/typeSections/OpenType_Features/openType";
import TypeInputTextsComponent from "../abstract_components/typeSections/typeInputTexts/typeInputTexts";
import TypeOverviewComponent from "../abstract_components/typeSections/typeOverview/typeOverview";
import SubsrcibeComponent from "../SUBSCRIBE/SUBSCRIBE";

const Specific_TypeComponent = ({ data, sectionRef }) => {
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

    const fonts = data?.Typefaces?.fonts?.[typeName]?.fonts;

    if (fonts) {
      const firstKey = Object.keys(fonts)?.[0];

      const firstFont = fonts[firstKey];

      const path = firstFont?.[0]?.url;

      opentype.load(path, (err, font) => {
        if (err) {
          console.error("Font could not be loaded:", err);
          setFontInfo({ error: "Font could not be loaded." });
          return;
        }

        const fontName = font?.names.fontFamily.en;

        const fvar = font?.tables.fvar;
        const gsub = font?.tables.gsub;

        // Extract axes info
        const axes = fvar?.axes.map((axis) => ({
          tag: axis?.tag,
          name: axis?.name.en,
          minValue: axis?.minValue,
          defaultValue: axis?.defaultValue,
          maxValue: axis?.maxValue,
        }));

        // Extract named instances info
        const instances = fvar?.instances.map((inst) => ({
          name: inst.name.en,
          coordinates: inst.coordinates,
        }));

        const names = font?.names;

        const features = gsub.features.map((feature, index) => ({
          tag: feature.tag,
        }));

        const filterFeatures = () => {
          const localArr = [];

          features.map((item) => {
            if (!localArr.some((i) => i.tag === item.tag)) {
              localArr.push(item);
            }
          });
          return localArr;
        };
        const filteredFeatures = filterFeatures();

        setFontInfo({
          axes,
          instances,
          designer: names.designer?.en,
          fontFeatures: filteredFeatures || "N/A",
          fontName: fontName || "NO NAME",
        });
      });
    }
  }, [typeName]);

  if (customTypeEntry) {
    return (
      <div className="specific_TypeComponent">
        <TypeHeader
          type={customTypeEntry}
          fontInfo={fontInfo}
          sectionRef={(el) => (sectionRef.current[0] = el)}
        />
        <TypeOverviewComponent
          data={customTypeEntry}
          placeholderData={data?.Typefaces.placeholderImage[0].url}
          sectionRef={(el) => (sectionRef.current[1] = el)}
        />
        <ImageWheelContainer
          data={typeObject}
          sectionRef={(el) => (sectionRef.current[2] = el)}
        />
        <OpenTypeComponent
          data={mdFile}
          font={customTypeEntry}
          fontInfo={fontInfo}
          sectionRef={(el) => (sectionRef.current[3] = el)}
        />
        <TypeInputTextsComponent
          data={mdFile}
          type={customTypeEntry}
          fontBio={fontBio}
          fontInfo={fontInfo}
          sectionRef={(el) => (sectionRef.current[4] = el)}
        />
        <SubsrcibeComponent sectionRef={(el) => (sectionRef.current[5] = el)} />
      </div>
    );
  }
};

export default Specific_TypeComponent;
