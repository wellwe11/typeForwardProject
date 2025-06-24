import { Link, useLocation } from "react-router-dom";

import React, { useEffect, useState } from "react";

import "./NAVBAR.scss";
import SvgLogo from "./svgLogo";

const ToggleMenuButton = ({ showButtons, setShowButtons }) => {
  const handleShowButtons = () => setShowButtons(!showButtons);
  return (
    <div className="toggleMenuButton">
      <button className="viewMenuButtons" onClick={handleShowButtons}>
        <h1>{showButtons ? "X" : "+"}</h1>
      </button>
    </div>
  );
};

const LogoButton = ({ backgroundColor }) => {
  const [isHover, setIsHover] = useState(false);

  const handleIsHover = () => setIsHover(!isHover);

  return (
    <div className="LogoContainer">
      <Link
        onMouseEnter={handleIsHover}
        onMouseLeave={handleIsHover}
        to={"./typefaces"}
      >
        <h1 className="logoTitle">type forward</h1>
        <div className="SVGContainer">
          <SvgLogo isHover={isHover} backgroundColor={backgroundColor} />
        </div>
      </Link>
    </div>
  );
};

const NavButtons = ({ backgroundColor, data }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();

  const buttonsObject = Object.keys(data);

  useEffect(() => {
    const handleResize = () => {
      setShowButtons(window.innerWidth >= 800 ? false : "");
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // So each button-text is displayed with capital letter at start as the nexted objects are all small lettered
  const firstLetterCapital = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    setActiveTab(location?.pathname.replace("/", ""));
  }, [location]);

  return (
    <ul className="navBarUl">
      <LogoButton backgroundColor={backgroundColor} />
      <div className="LinksContainer">
        <ToggleMenuButton
          showButtons={showButtons}
          setShowButtons={setShowButtons}
        />
        {buttonsObject.map((key, index) => (
          <div
            key={index}
            className="uniqueLinkContainer"
            style={{ display: showButtons ? "flex" : "" }}
          >
            <Link to={data[key].linkUrl}>
              <span className="keyTextSpan">
                <h2
                  className="keyText"
                  style={{
                    fontVariationSettings:
                      key === activeTab ? "'wght' 820" : "",
                  }}
                >
                  {firstLetterCapital(key).replace(/_/g, " ")}
                </h2>
              </span>
              <span className="keyTextSpanHidden">
                <h2>{key}</h2>
              </span>
            </Link>
          </div>
        ))}
      </div>
    </ul>
  );
};

const NavBarComponent = ({ backgroundColor, data }) => {
  return (
    <div
      className="navBarContainer"
      style={{
        backgroundColor: backgroundColor === "white" ? "white" : "black",
        color: backgroundColor === "black" ? "white" : "black",
        borderBottom:
          backgroundColor === "white" ? "2px solid black" : "2px solid white",
      }}
    >
      <NavButtons backgroundColor={backgroundColor} data={data} />
    </div>
  );
};

export default React.memo(NavBarComponent);
