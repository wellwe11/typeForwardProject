import "./FOOTER.scss";

import { Link } from "react-router-dom";

import dribblbleIcon from "../../resourceFolder_typeFoward/assets/images/dribbble.min.svg";
import myFontsIcon from "../../resourceFolder_typeFoward/assets/images/myfonts.min.svg";
import behanceIcon from "../../resourceFolder_typeFoward/assets/images/behance.min.svg";
import instagramIcon from "../../resourceFolder_typeFoward/assets/images/instagram.min.svg";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";

const FooterComponent = () => {
  const todaysYear = new Date().getFullYear();

  const navLinks = useNavLinks();
  const linkKeys = Object.keys(navLinks);

  console.log(navLinks);

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
              <h3 className="linkText">contact@typeforward.com</h3>
            </button>
            <div className="linkImagesContainer">
              <div className="iconButtonContainer">
                <div className="insideIconButtonContainer">
                  <button
                    className="iconButton"
                    onClick={() =>
                      window.open(
                        "https://www.fontspring.com/foundry/type-forward?cjdata=MXxZfDB8WXww&cjevent=dbec129f4b9a11f083f302520a18ba73&utm_source=cj&utm_medium=affiliate",
                        "_blank"
                      )
                    }
                  >
                    <img src={myFontsIcon} alt="" />
                  </button>
                </div>
              </div>
              <div className="iconButtonContainer">
                <div className="insideIconButtonContainer">
                  <button
                    className="iconButton"
                    onClick={() =>
                      window.open(
                        "https://www.behance.net/typeforward",
                        "_blank"
                      )
                    }
                  >
                    <img src={behanceIcon} alt="" />
                  </button>
                </div>
              </div>
              <div className="iconButtonContainer">
                <div className="insideIconButtonContainer">
                  <button
                    className="iconButton"
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/type_forward/#",
                        "_blank"
                      )
                    }
                  >
                    <img src={instagramIcon} alt="" />
                  </button>
                </div>
              </div>
              <div className="iconButtonContainer">
                <div className="insideIconButtonContainer">
                  <button
                    className="iconButton"
                    onClick={() =>
                      window.open("https://dribbble.com/typeforward", "_blank")
                    }
                  >
                    <img src={dribblbleIcon} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterComponent;
