import "./App.scss";
import { createContext, useContext, useMemo } from "react";

const NavLinksContext = createContext();

export const TabComponentProvider = ({ children }) => {
  const createRoute =
    (base) =>
    (path = "") =>
      `${base}/${path}`;

  const baseRoute = createRoute("https://www.typeforward.com");

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
