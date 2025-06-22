import { useEffect, useState } from "react";

// goal is to dynamically have files which will allow admin to update nav-buttons & its content
// first import local file

const localData = import.meta.glob(
  "../../../resourceFolder_typeFoward/assets/**/*",
  {
    eager: true,
    as: "url",
  }
);

// remove all file-path that wont be used inside of the main-objet 'api'
const cleanPathFile = (data, replace) =>
  Object.keys(data).map((path) => path.replace(replace, "").trim().split("/"));

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

    segments.forEach((key, index) => {
      let length = Object.keys(current).length;

      if (index === segments.length - 1) {
        const keyExtension = key.split(".").pop().toLowerCase();

        console.log(segments[0]);
        if (imageFiles.includes(keyExtension)) {
          current[length] = {
            url:
              `../../../resourceFolder_typeFoward/assets/${segments[0]}/${segments[1]}/` +
              key,
          };
        }

        if (typeFiles.includes(keyExtension)) {
          current[length] = {
            url:
              `../../../resourceFolder_typeFoward/assets/${segments[0]}/${segments[1]}/` +
              key,
          };
        }

        if (bioFiles.includes(keyExtension)) {
          current[length] = {
            url:
              `../../../resourceFolder_typeFoward/assets/${segments[0]}/${segments[1]}/` +
              key,
          };
        }
      } else {
        if (!current[key]) {
          current[key] = {};
          if (index === 0) {
            current[key] = { linkUrl: segments[index] };
          }
        }

        current = current[key];
      }
    });
  });

  return localObj;
};

export const ExportData = () => {
  const [objectData, setObjectData] = useState({});

  useEffect(() => {
    const cleanedPath = cleanPathFile(
      localData,
      "../../../resourceFolder_typeFoward/assets/"
    );
    const structured = sortFiles(cleanedPath);
    setObjectData(structured);
  }, []);

  return objectData;
};
