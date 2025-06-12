import { Link } from "react-router-dom";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";
import React from "react";

const NavBarComponent = ({}) => {
  const navLinks = useNavLinks();

  const linkKeys = Object.keys(navLinks);

  return (
    <div>
      <h1>list:</h1>
      <ul>
        {linkKeys.map((key, index) => (
          <div key={index}>
            <Link>{key}</Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(NavBarComponent);
