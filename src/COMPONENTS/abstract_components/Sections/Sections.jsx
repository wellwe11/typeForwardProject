// goal is to dynamically have files which will allow admin to update nav-buttons & its content
// first import local file

import { useState } from "react";

// remove all file-path that wont be used inside of the main-objet 'api'
const cleanPathFile = (data, replace) =>
  Object.keys(data).map((path) => path.replace(replace, "").trim().split("/"));

// now sort each tab below their corresponding file
// since file-path is built like /file/secondFile/thirdFile, we already have a hierarchy to build an object from
const sortFiles = async (data, fullData, path) => {
  const localObj = {};

  const imageFiles = ["png", "svg", "jpg", "jpeg", "gif", "webp"];
  const typeFiles = ["woff", "woff2"];
  const bioFiles = ["md"];
  const jsonFiles = ["json"];

  for (const segments of data) {
    let current = localObj;

    for (let index = 0; index < segments.length; index++) {
      const key = segments[index];
      const length = Object.keys(current).length;

      if (index === segments.length - 1) {
        const absolutePath = fullData[`${path}${segments.join("/")}`];
        const keyExtension = key.split(".").pop().toLowerCase();

        if (imageFiles.includes(keyExtension)) {
          current[length] = { url: absolutePath };
        }

        if (typeFiles.includes(keyExtension)) {
          const fontName = segments[4]
            .replace(/-/g, " ")
            .replace(/\./g, " ")
            .replace(/\d+/g, "")
            .replace(/woff\d*/g, "");
          current[length] = {
            url: fullData[`${path}${segments.join("/")}`],
            name: fontName,
          };
        }

        if (bioFiles.includes(keyExtension)) {
          current[length] = { url: absolutePath };
        }

        if (jsonFiles.includes(keyExtension)) {
          try {
            const res = await fetch(absolutePath);
            const json = await res.json();
            current._embedded = { info: json };
          } catch (err) {
            console.error("Failed to fetch json in Sections.jsx", err);
          }
        }
      } else {
        if (!current[key]) {
          current[key] = index === segments.length - 2 ? [] : {};
        }

        current = current[key];
      }
    }
  }

  return localObj;
};

export const exportData = async (localData, path) => {
  const cleanedPath = cleanPathFile(localData, path);
  const structured = await sortFiles(cleanedPath, localData, path);

  const sortByPosition = (items) => {
    return Object.entries(items).sort(
      ([, a], [, b]) =>
        +a?._embedded.info.position - +b?._embedded.info.position
    );
  };

  if (structured) {
    const sorted = sortByPosition(structured);

    return Object.fromEntries(sorted);
  }
};
