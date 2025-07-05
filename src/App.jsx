import "./App.scss";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { exportData } from "./COMPONENTS/abstract_components/Sections/Sections";
import { TabComponentProvider } from "./TABCOMPONENTPROVIDER";
import FooterComponent from "./COMPONENTS/FOOTER/FOOTER";
import NavBarComponent from "./COMPONENTS/NAVBAR/NAVBAR_component";
// import TypeservicesComponent from "./COMPONENTS/HOME/HOME_component";
// import ServicesComponent from "./COMPONENTS/SERVICES/SERVICES_component";
// import TrailFontsComponent from "./COMPONENTS/TRAIL_FONTS/TRAIL_FONTS";
// import AboutUsComponent from "./COMPONENTS/ABOUT_US/ABOUTUS_component";
// import BlogComponent from "./COMPONENTS/BLOG/BLOG";
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

  console.log(data);
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

  console.log(componentMap);

  if (!data.Typefaces?._embedded) return null;

  if (data) {
    console.log("Component map keys:", Object.keys(componentMap));

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
                  console.log(componentMap[pageName]);

                  return (
                    <Route
                      key={pageName}
                      path={obj._embedded.info.linkTo || "/"}
                      element={<Component data={data} />}
                    />
                  );
                })}

                {/* <Route
                path=""
                element={<HomeComponent sectionRef={sectionRefs} data={data} />}
                />
                
                <Route
                path="services"
                element={
                  <ServicesComponent sectionRef={sectionRefs} data={data} />
                  }
                  />
                  <Route
                  path="trail_fonts"
                  element={
                    <TrailFontsComponent sectionRef={sectionRefs} data={data} />
                    }
                    />
                    
                    <Route
                    path="about_us"
                    element={
                      <AboutUsComponent sectionRef={sectionRefs} data={data} />
                      }
                      />
                      <Route
                      path="blog"
                      element={<BlogComponent sectionRef={sectionRefs} data={data} />}
                      />
                      
                      */}
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
 * move subscribe from home to abstract_components
 * move borderWidthBorder.jsx to its own folder and rename abstract.scss
 *
 * Currently, about us in anvbar isnt thick when seleceted, because the link is "about_us" which doesnt match the text "about us"
 *
 *
 * on home page -> download -> form doesnt pop up in center of screen
 *
 * on-page reload, reset view-point to top
 * currently, navbar doesnt change color if you change page
 * navbutton on small screens (x/+) needs to change color with navbar
 */
