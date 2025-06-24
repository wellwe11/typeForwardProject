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
import AboutUsComponent from "./COMPONENTS/ABOUT US/ABOUTUS_component";
import { ExportData } from "./COMPONENTS/abstract_components/Sections/Sections";

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
  let data = ExportData();

  if (!data) {
    return (
      <div>
        <h1>...Loading</h1>
      </div>
    );
  }

  if (data) {
    console.log(data);

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

    return (
      <div className="appContainer">
        <TabComponentProvider>
          <Router>
            <ScrollToTop />
            <NavBarComponent backgroundColor={navbarColor} data={data} />
            <Routes>
              <Route
                path="/typefaces"
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
