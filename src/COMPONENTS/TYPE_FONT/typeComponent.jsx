import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import fetchWholeMd from "../../functions/fetchWholeMd";

const Specific_TypeComponent = ({ data }) => {
  const [typeName, setTypeName] = useState(null);
  const [typeObject, setTypeObject] = useState(null);
  const { hash } = useLocation();
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

  console.log(mdFile);

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

  return (
    <div>
      <h1 style={{ color: "black" }}>hello</h1>
    </div>
  );
};

export default Specific_TypeComponent;
