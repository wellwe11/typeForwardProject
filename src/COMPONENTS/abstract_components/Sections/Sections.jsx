import { useEffect, useState } from "react";
import BoldAndThinText from "../boldAndThinText/boldAndThinText";

// gaol Object
const object = {
  "about us": {
    content: {
      "Mirela Belova": {
        images: { someImage: { url: "" }, someImageTwo: { url: "" } },
        bio: "",
      },
      "Stan Partalev": {
        // ..more files
      },
    },
  },

  services: {
    content: {
      "Custom Licensing": {
        images: { someImage: { url: "" }, someImageTwo: { url: "" } },
        bio: "",
      },
      "Custom Typeface": {
        images: { someImage: { url: "" }, someImageTwo: { url: "" } },
        bio: "",
      },
    },
  },
};

// goal is to dynamically have files which will allow admin to update nav-buttons & its content
// first import local file
const localData = import.meta.glob(
  "../../../resourceFolder_typeFoward/assets/*/**",
  { eager: true, as: "url" }
);

// remove all file-path that wont be used inside of the main-objet 'api'
const cleanPathFile = (data) =>
  Object.keys(data).map((path) =>
    path
      .replace("../../../resourceFolder_typeFoward/assets/", "")
      .trim()
      .split("/")
  );

// now sort each tab below their corresponding file
// since file-path is built like /file/secondFile/thirdFile, we already have a hierarchy to build an object from
const sortFiles = (data) => {
  const localObj = {};

  // file extensions to sort objects info
  const imageFiles = ["png", "svg", "jpg", "jpeg", "gif", "webp"];
  const typeFiles = ["woff", "woff2"];
  const bioFiles = ["md"];

  data.forEach((segments) => {
    let current = localObj;
    let length = Object.keys(current).length;

    segments.forEach((key, index) => {
      if (index === segments.length - 1) {
        const keyExtension = key.split(".").pop().toLowerCase();

        if (imageFiles.includes(keyExtension)) {
          current[length] = { url: key };
        }

        if (typeFiles.includes(keyExtension)) {
          current[length] = { url: key };
        }

        if (bioFiles.includes(keyExtension)) {
          current[length] = { url: key };
        }
      } else {
        if (!current[key]) {
          current[key] = {};
        }

        current = current[key];
      }
    });
  });

  return localObj;
};

const SectionComponentHandler = () => {
  const [objectData, setObjectData] = useState({});

  useEffect(() => {
    const cleanedPath = cleanPathFile(localData);
    const structured = sortFiles(cleanedPath);
    setObjectData(structured);

    console.log(structured);
  }, []);
};

export default SectionComponentHandler;
