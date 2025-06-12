import { Link } from "react-router-dom";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";
import React from "react";

const NavBarComponent = ({}) => {
  const navLinks = useNavLinks();

  const linkKeys = Object.keys(navLinks);

  console.log(navLinks, linkKeys);

  return (
    <div>
      <h1>list:</h1>
      <ul>
        {linkKeys.map((key, index) => (
          <div key={index}>
            <Link to={navLinks[key].baseUrl}>{key}</Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(NavBarComponent);
