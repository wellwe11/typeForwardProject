import HomeComponent from "./COMPONENTS/HOME/HOME_component";
import NavBarComponent from "./COMPONENTS/NAVBAR/NAVBAR_component";
import { TabComponentProvider } from "./TABCOMPONENTPROVIDER";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./App.scss";
import FooterComponent from "./COMPONENTS/FOOTER/FOOTER";
import { useEffect, useRef, useState } from "react";
import ServicesComponent from "./COMPONENTS/SERVICES/SERVICES_component";
import TrailFontsComponent from "./COMPONENTS/TRAIL_FONTS/TRAIL_FONTS";
import AboutUsComponent from "./COMPONENTS/ABOUT_US/ABOUTUS_component";
import { exportData } from "./COMPONENTS/abstract_components/Sections/Sections";
import BlogComponent from "./COMPONENTS/BLOG/BLOG";
import BlogPosterComponent from "./COMPONENTS/BLOG_POSTER/blog_posterComponent";

const localData = import.meta.glob("./resourceFolder_typeFoward/**/*", {
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
        "./resourceFolder_typeFoward/"
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

  if (!data.typefaces?._embedded) return null;

  if (data) {
    return (
      <div className="appContainer">
        <TabComponentProvider>
          <Router>
            <ScrollToTop />
            <NavBarComponent backgroundColor={navbarColor} data={data} />
            <Routes>
              <Route
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
              <Route
                path="blog/blog_poster"
                element={<BlogPosterComponent data={data} />}
              />
            </Routes>
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
 *
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
