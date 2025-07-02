import "./typeComponent.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchWholeMd from "../../functions/fetchWholeMd";
import TypeHeader from "../abstract_components/typeSections/typeSection";
import ImageWheelContainer from "../abstract_components/imageWheelSlider/imageWheelComponent";
import SizeContainerComponent from "../abstract_components/sizeContainer/sizeContainerComponent";

const Specific_TypeComponent = ({ data }) => {
  // font name
  const [typeName, setTypeName] = useState(null);
  const { hash } = useLocation();

  // unique types properties. Each type has a few variation of information.
  const [typeObject, setTypeObject] = useState(null);

  // foundation-file for each font
  const [mdFile, setMdFile] = useState(null);

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

  if (mdFile && typeObject) {
    const customTypeEntry = [typeName, typeObject];
    return (
      <div className="specific_TypeComponent">
        <TypeHeader type={customTypeEntry} />
        <ImageWheelContainer data={typeObject} />
      </div>
    );
  }
};

export default Specific_TypeComponent;
