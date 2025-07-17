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
  const [extended_assets, setExtended_assets] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await exportData(
        localData,
        "../public/resourceFolder_typeFoward/"
      );

      setData(fetchedData.assets);
      setExtended_assets(fetchedData.extended_assets);
    };

    fetchData();
  }, []);

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

  if (!data) {
    return (
      <div>
        <h1>...Loading</h1>
      </div>
    );
  }

  if (!data.Typefaces?._embedded) return null;

  if (data) {
    return (
      <div className="appContainer">
        <TabComponentProvider>
          <Router>
            <ScrollToTop />
            <NavBarComponent
              data={data}
              navbarColor={navbarColor}
              setNavColor={setNavColor}
              sectionRefs={sectionRefs}
            />
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {Object.entries(data).map(([pageName, obj]) => {
                  const Component = componentMap[pageName];

                  return (
                    <Route
                      key={pageName}
                      path={obj._embedded.info.linkTo || "/"}
                      element={
                        <Component
                          data={data}
                          extendedAssets={extended_assets}
                          sectionRef={sectionRefs}
                        />
                      }
                    />
                  );
                })}

                <Route
                  path="blog/blog_poster"
                  element={
                    <BlogPosterComponent data={data} sectionRef={sectionRefs} />
                  }
                />
                <Route
                  path="typefaces/type"
                  element={
                    <Specific_TypeComponent
                      data={data}
                      sectionRef={sectionRefs}
                    />
                  }
                />
              </Routes>
            </Suspense>
            <FooterComponent data={extended_assets?.socials_icons} />
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
 *
 * fix 'contact us' email buttons style
 *
 * on blog-page. Clicking nav-buttons should navigate to corresponding section
 * on blog page, subscribe does not work
 *
 *
 *
 * '' extras for future if I want to:
 * add cookies button when page is first loaded
 * ---maybe make it so that cookies are saved when you've clicked accept or not accept
 * add link to social-icons (for profiles, footer, about us etc)
 *
 * Create Privacy Policy page which is navigated to from the footer
 *
 * * ---small bug where the navbar doesnt always change color. This is because between each component, there's a small gray area where entry is undefined
 */
