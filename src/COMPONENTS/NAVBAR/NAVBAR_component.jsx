import { Link } from "react-router-dom";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";
import React, { useState } from "react";

import "./NAVBAR.scss";

const NavBarComponent = ({}) => {
  const navLinks = useNavLinks();

  const linkKeys = Object.keys(navLinks);

  const homeItem = linkKeys[0];
  const restItems = linkKeys.slice(1, linkKeys.length);

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
                <span className="keyText">
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
