import "./App.scss";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
const fonts = import.meta.glob("./resourceFolder_typeFoward/assets/fonts/*/**");

const NavLinksContext = createContext();

// render files
const getFileNames = (files) => {
  const allFiles = Object.keys(files);

  const fileFolders = {};

  allFiles.forEach((filePath) => {
    const parts = filePath.split("/");
    const fileName = parts[4];
    const fontFile = parts[5];

    if (!fileFolders[fileName]) {
      fileFolders[fileName] = {
        fonts: [fontFile],
        importers: [files[filePath]],
      };
    } else if (fileFolders[fileName]) {
      fileFolders[fileName].fonts.push(fontFile);
      fileFolders[fileName].importers.push(files[filePath]);
    }
  });

  console.log(fileFolders);
  return fileFolders;
};

export const TabComponentProvider = ({ children }) => {
  const [fontsNames, setFontsNames] = useState([]);
  useEffect(() => {
    const folders = getFileNames(fonts);

    setFontsNames(folders);
  }, []);

  // create a direct link
  const createRoute =
    (base) =>
    (path = "") =>
      `${base}/${path}`;

  // if needed, real website
  const actualUrl = createRoute("https://www.typeforward.com");

  // temp url for this project
  const baseRoute = createRoute("http://localhost:5173");

  // create url that has links
  const createSubRoutes = (base, paths) => {
    const route = createRoute(base);
    const result = { baseUrl: route() };

    result.links = Object.entries(paths).map(
      ([folderName, { fonts, importers }]) => ({
        name: folderName,
        url: route(folderName),
        count: fonts,
        importers: importers,
      })
    );

    return result;
  };

  const navLinks = useMemo(
    () => ({
      home: { baseUrl: baseRoute() },
      // display on homepage
      typefaces: createSubRoutes(baseRoute("typefaces"), fontsNames),
      subscribe: { baseUrl: baseRoute() },
      services: { baseUrl: baseRoute() },

      // display on new pages
      trails: { baseUrl: baseRoute("trails") },
      about: { baseUrl: baseRoute("about") },
      blog: { baseUrl: baseRoute("blog") },
    }),
    [fontsNames]
  );
  return (
    <NavLinksContext.Provider value={navLinks}>
      {children}
    </NavLinksContext.Provider>
  );
};

export const useNavLinks = () => useContext(NavLinksContext);
