import { Link } from "react-router-dom";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";
import React, { useState } from "react";

import "./NAVBAR.scss";
import SvgLogo from "./svgLogo";

const LogoButton = ({ navLinks, backgroundColor }) => {
  const [isHover, setIsHover] = useState(false);

  const handleIsHover = () => setIsHover(!isHover);

  return (
    <div className="LogoContainer">
      <Link
        onMouseEnter={handleIsHover}
        onMouseLeave={handleIsHover}
        to={navLinks.home.baseUrl}
      >
        <h1 className="logoTitle">type forward</h1>
        <div className="SVGContainer">
          <SvgLogo isHover={isHover} backgroundColor={backgroundColor} />
        </div>
      </Link>
    </div>
  );
};

const NavButtons = ({ backgroundColor }) => {
  const navLinks = useNavLinks();
  const linkKeys = Object.keys(navLinks);

  const restItems = linkKeys.slice(1, linkKeys.length);

  // So each button-text is displayed with capital letter at start as the nexted objects are all small lettered
  const firstLetterCapital = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <ul className="navBarUl">
      <LogoButton navLinks={navLinks} backgroundColor={backgroundColor} />
      <div className="LinksContainer">
        {restItems.map((key, index) => (
          <div key={index} className="uniqueLinkContainer">
            <Link to={navLinks[key].baseUrl}>
              <span className="keyTextSpan">
                <h2 className="keyText">{firstLetterCapital(key)}</h2>
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

const NavBarComponent = ({ backgroundColor }) => {
  return (
    <div
      className="navBarContainer"
      style={{
        backgroundColor: backgroundColor === "white" ? "black" : "white",
        color: backgroundColor === "black" ? "black" : "white",
        borderBottom:
          backgroundColor === "black" ? "2px solid black" : "2px solid white",
      }}
    >
      <NavButtons backgroundColor={backgroundColor} />
    </div>
  );
};

export default React.memo(NavBarComponent);
