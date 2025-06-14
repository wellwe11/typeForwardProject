import { Link } from "react-router-dom";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";
import React, { useState } from "react";

import "./NAVBAR.scss";

const NavBarComponent = ({}) => {
  const navLinks = useNavLinks();

  const linkKeys = Object.keys(navLinks);

  const homeItem = linkKeys[0];
  const restItems = linkKeys.slice(1, linkKeys.length);

  // So each button-text is displayed with capital letter at start as the nexted objects are all small lettered
  const firstLetterCapital = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <div className="navBarContainer">
      <ul className="navBarUl">
        <div className="LogoContainer">
          <Link to={navLinks.home.baseUrl}>{homeItem}</Link>
        </div>
        <div className="LinksContainer">
          {restItems.map((key, index) => (
            <div key={index} className="uniqueLinkContainer">
              <Link to={navLinks[key].baseUrl}>
                <span className="keyTextSpan">
                  <h3 className="keyText">{firstLetterCapital(key)}</h3>
                </span>
                <span className="keyTextSpanHidden">
                  <h3>{key}</h3>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default React.memo(NavBarComponent);
