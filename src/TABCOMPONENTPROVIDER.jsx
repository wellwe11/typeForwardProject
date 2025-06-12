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

const getFileNames = (files, replace) => {
  const allFiles = Object.keys(files);
  const fileFolders = new Set();

  allFiles.forEach((filePath) => {
    const parts = filePath.split("/");
    parts.pop();
    const folderPath = parts.join("/").replace(replace, "");
    fileFolders.add(folderPath);
  });

  return Array.from(fileFolders);
};

export const TabComponentProvider = ({ children }) => {
  const [fontsNames, setFontsNames] = useState([]);
  useEffect(() => {
    const folders = getFileNames(
      fonts,
      "./resourceFolder_typeFoward/assets/fonts/"
    );

    setFontsNames(folders);
  }, []);

  // create a direct link
  const createRoute =
    (base) =>
    (path = "") =>
      `${base}/${path}`;

  const actualUrl = createRoute("https://www.typeforward.com");

  // temp url for this project
  const baseRoute = createRoute("http://localhost:5173");

  // create url that has links
  const createSubRoutes = (base, paths) => {
    const route = createRoute(base);
    const result = { baseUrl: route() };

    result.links = paths.map((p) => route(p));

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
