import HomeComponent from "./COMPONENTS/HOME/HOME_component";
import NavBarComponent from "./COMPONENTS/NAVBAR/NAVBAR_component";
import { TabComponentProvider } from "./TABCOMPONENTPROVIDER";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./App.scss";
import FooterComponent from "./COMPONENTS/FOOTER/FOOTER";
import { useEffect, useRef, useState } from "react";

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
  const [navbarColor, setNavColor] = useState("white");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          const classList = visibleEntry.target.classList;
          if (classList.contains("sectionBlack")) {
            setNavColor("white");
          } else {
            setNavColor("black");
          }
        }
      },
      {
        threshold: 0.17,
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="appContainer">
      <TabComponentProvider>
        <Router>
          <ScrollToTop />
          <NavBarComponent backgroundColor={navbarColor} />
          <Routes>
            <Route
              path="/"
              element={<HomeComponent sectionRef={sectionRefs} />}
            />
          </Routes>
          <FooterComponent />
        </Router>
      </TabComponentProvider>
    </div>
  );
}

export default App;
