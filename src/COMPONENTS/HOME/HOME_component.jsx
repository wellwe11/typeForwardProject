import React, { useMemo } from "react";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";

const TypeFaceComponent = () => {
  const navLinks = useNavLinks();

  const linkKeys = Object.keys(navLinks);
};

const HomeComponent = () => {
  return (
    <div>
      <h1>welcome to home</h1>
    </div>
  );
};

export default HomeComponent;
