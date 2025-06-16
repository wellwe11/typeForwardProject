import "./FOOTER.scss";

import dribblbleIcon from "../../resourceFolder_typeFoward/assets/images/dribbble.min.svg";
import myFontsIcon from "../../resourceFolder_typeFoward/assets/images/myfonts.min.svg";
import behanceIcon from "../../resourceFolder_typeFoward/assets/images/behance.min.svg";
import instagramIcon from "../../resourceFolder_typeFoward/assets/images/instagram.min.svg";

const FooterComponent = () => {
  const todaysYear = new Date().getFullYear();
  console.log(todaysYear);

  const navButtonNames = [
    "About",
    "Blog",
    "Typefaces",
    "Services",
    "Trail fonts",
    "Privacy Policy",
  ];

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
            {navButtonNames.map((button, i) => (
              <button key={i} className="linkButton">
                <h3 className="linkText">{button}</h3>
                <div className="linkUnderline"></div>
              </button>
            ))}
            <button className="linkButton email">
              <h3 className="linkText">contact@typeforward.com</h3>
            </button>
            <div className="linkImagesContainer">
              <div className="iconButtonContainer">
                <div className="insideIconButtonContainer">
                  <button className="iconButton">
                    <img src={myFontsIcon} alt="" />
                  </button>
                </div>
              </div>
              <div className="iconButtonContainer">
                <div className="insideIconButtonContainer">
                  <button className="iconButton">
                    <img src={behanceIcon} alt="" />
                  </button>
                </div>
              </div>
              <div className="iconButtonContainer">
                <div className="insideIconButtonContainer">
                  <button className="iconButton">
                    <img src={instagramIcon} alt="" />
                  </button>
                </div>
              </div>
              <div className="iconButtonContainer">
                <div className="insideIconButtonContainer">
                  <button className="iconButton">
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
