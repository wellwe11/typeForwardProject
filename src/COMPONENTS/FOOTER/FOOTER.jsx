import "./FOOTER.scss";

import { Link } from "react-router-dom";

import LinkImagesComponent from "../abstract_components/smallIcons/smallIconsComponent";

const FooterComponent = ({ data }) => {
  const todaysYear = new Date().getFullYear();

  const navButtonNames = {
    About: "about",
    Blog: "blog",
    Typefaces: "",
    Services: "services",
    "Trail fonts": "trail_fonts",
    "Privacy Policy": "privacy-policy",
  };

  return (
    <section className="footerSection">
      <div className="footerContainer">
        <div className="innerWidthContainer">
          <div className="rightReserved">
            <h3 className="rightReservedText">
              © {todaysYear} Type Forward ∙ All rights reserved
            </h3>
          </div>
          <div className="linksContainer">
            {Object.keys(navButtonNames).map((button, i) => (
              <Link
                key={i}
                className="linkButton"
                to={Object.values(navButtonNames)[i]}
              >
                <h3 className="linkText">{button}</h3>
                <div className="linkUnderline"></div>
              </Link>
            ))}
            <button className="linkButton email">
              <h2 className="linkText">contact@typeforward.com</h2>
            </button>
            <LinkImagesComponent data={data} sectionColor={"black"} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterComponent;
