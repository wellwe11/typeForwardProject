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

  return fileFolders;
};

// create a direct link
export const createRoute =
  (base) =>
  (path = "") =>
    `${base}/${path}`;

// if needed, real website
const actualUrl = createRoute("https://www.typeforward.com");

// temp url for this project
const baseRoute = createRoute("http://localhost:5173");

// create url that has links
export const createSubRoutes = (base, paths) => {
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

export const TabComponentProvider = ({ children }) => {
  const [fontsNames, setFontsNames] = useState([]);
  useEffect(() => {
    const folders = getFileNames(fonts);

    setFontsNames(folders);
  }, []);

  const navLinks = useMemo(
    () => ({
      home: { baseUrl: baseRoute() },

      typefaces: createSubRoutes(baseRoute("."), fontsNames), // goes to home page > typefaces section
      services: { baseUrl: baseRoute("services") },
      "trail fonts": { baseUrl: baseRoute("trail_fonts") },
      "about us": { baseUrl: baseRoute("about_us") },
      subscribe: { baseUrl: baseRoute() }, // goes to subscribe on whatever page you are at
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
