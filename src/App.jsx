import "./App.scss";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  useLocation,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { exportData } from "./COMPONENTS/abstract_components/Sections/Sections";
import { TabComponentProvider } from "./TABCOMPONENTPROVIDER";
import FooterComponent from "./COMPONENTS/FOOTER/FOOTER";
import NavBarComponent from "./COMPONENTS/NAVBAR/NAVBAR_component";

import BlogPosterComponent from "./COMPONENTS/BLOG_POSTER/blog_posterComponent";
import Specific_TypeComponent from "./COMPONENTS/TYPE_FONT/typeComponent";

const localData = import.meta.glob("../public/resourceFolder_typeFoward/**/*", {
  eager: true,
  as: "url",
});

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pathname]);

  return null;
};

function App() {
  // for navbar to track section-color
  const sectionRefs = useRef([]);
  const [navbarColor, setNavColor] = useState("black");
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await exportData(
        localData,
        "../public/resourceFolder_typeFoward/"
      );

      setData(fetchedData.assets);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div>
        <h1>...Loading</h1>
      </div>
    );
  }

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const visibleEntry = entries.find((entry) => entry.isIntersecting);
  //       if (visibleEntry) {
  //         const classList = visibleEntry.target.classList;
  //         if (classList.contains("sectionBlack")) {
  //           setNavColor("black");
  //         } else {
  //           setNavColor("white");
  //         }
  //       }
  //     },
  //     {
  //       threshold: 0.17,
  //     }
  //   );

  //   sectionRefs.current.forEach((section) => {
  //     if (section) observer.observe(section);
  //   });

  //   return () => observer.disconnect();
  // }, []);
  const componentMap = useMemo(() => {
    const map = {};
    Object.keys(data).forEach((pageName) => {
      map[pageName] = lazy(() =>
        import(
          `./COMPONENTS/${pageName.toUpperCase()}/${pageName}Component.jsx`
        )
      );
    });

    return map;
  }, [Object.keys(data).join(",")]);

  if (!data.Typefaces?._embedded) return null;

  if (data) {
    return (
      <div className="appContainer">
        <TabComponentProvider>
          <Router>
            <ScrollToTop />
            <NavBarComponent backgroundColor={navbarColor} data={data} />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {Object.entries(data).map(([pageName, obj]) => {
                  const Component = componentMap[pageName];

                  return (
                    <Route
                      key={pageName}
                      path={obj._embedded.info.linkTo || "/"}
                      element={<Component data={data} />}
                    />
                  );
                })}

                <Route
                  path="blog/blog_poster"
                  element={<BlogPosterComponent data={data} />}
                />
                <Route
                  path="typefaces/type"
                  element={<Specific_TypeComponent data={data} />}
                />
              </Routes>
            </Suspense>
            <FooterComponent />
          </Router>
        </TabComponentProvider>
      </div>
    );
  }
}

export default App;

/**
 * bugs on original website:
 * ". Type&nbsp;Forward " on https://www.typeforward.com/services#custom-licensing
 *“A typeface that is odd and oval, why not call it “Oddval,” suggested the designers at FourPlus. We immediately fell in love with it. We knew the name might sound strange but wasn’t that the point from the beginning?
 *
 * Make it so text on nav-bar is thick on load (when you refresh page, the current page should be bold-text on navbar)
 * Navbar currently does not scale well when you make window smaller
 * Add SVG animations to small-window navbar for dropdown menu and fix the logic for how it opens/closes
 * Fix "free" button for fonts (currently small text for some reason)
 *
 * Make so the navbar changes color and match whatever section screen currently is over
 * also apply it for +/x button when window is smaller
 *
 *
 * on home page -> download -> form doesnt pop up in center of screen
 *
 * on-page reload, reset view-point to top
 * currently, navbar doesnt change color if you change page
 * navbutton on small screens (x/+) needs to change color with navbar
 */
