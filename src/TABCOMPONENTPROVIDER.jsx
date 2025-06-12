import "./App.scss";
import React, { createContext, useContext, useMemo } from "react";
const fonts = import.meta.glob("./assets/fonts");

const NavLinksContext = createContext();

function IconsGallery() {
  const [fonts, setFonts] = React.useState([]);

  React.useEffect(() => {
    const imports = Object.values(fonts).map((importFn) => importFn());
    Promise.all(imports).then((modules) => {
      setFonts(modules.map((mod, index) => <mod.default key={index} />));
    });
  }, []);

  console.log(fonts);
}

export const TabComponentProvider = ({ children }) => {
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
      typefaces: createSubRoutes(baseRoute("typefaces"), [
        "serif",
        "sans-serif",
        "display",
      ]),
      subscribe: { baseUrl: baseRoute() },
      services: { baseUrl: baseRoute() },

      // display on new pages

      trails: { baseUrl: baseRoute("trails") },
      about: { baseUrl: baseRoute("about") },
      blog: { baseUrl: baseRoute("blog") },
    }),
    []
  );
  return (
    <NavLinksContext.Provider value={navLinks}>
      {children}
    </NavLinksContext.Provider>
  );
};

export const useNavLinks = () => useContext(NavLinksContext);
