import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";

import "./NAVBAR.scss";
import SvgLogo from "./svgLogo";
import addSpaceBeforeCaps from "../../functions/addSpaceBeforeCaps";
import NavBarSVG from "./navIcons/navSVG";

const ToggleMenuButton = ({ showButtons, handleShowButtons }) => {
  return (
    <div className="toggleMenuButton">
      <button className="viewMenuButtons" onClick={handleShowButtons}>
        <NavBarSVG
          showButtons={showButtons}
          handleShowButtons={handleShowButtons}
        />
      </button>
    </div>
  );
};

const LogoButton = ({ backgroundColor }) => {
  const [isHover, setIsHover] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleIsHover = () => setIsHover(!isHover);

  return (
    <div className="LogoContainer">
      <Link
        onMouseEnter={handleIsHover}
        onMouseLeave={handleIsHover}
        to={""}
        onClick={scrollToTop}
      >
        <h1 className="logoTitle">type forward</h1>
        <div className="SVGContainer">
          <SvgLogo isHover={isHover} backgroundColor={backgroundColor} />
        </div>
      </Link>
    </div>
  );
};

const NavButtons = ({
  backgroundColor,
  data,
  showButtons,
  setShowButtons,
  handleShowButtons,
}) => {
  const [activeTab, setActiveTab] = useState("/");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/")
      setActiveTab(location.pathname.replace("/", ""));
  }, []);

  const buttonsObject = Object.entries(data);

  useEffect(() => {
    const handleResize = () => {
      setShowButtons(window.innerWidth >= 800 ? false : "");
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // So each button-text is displayed with capital letter at start as the nexted objects are all small lettered
  const firstLetterCapital = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, " ");

  // go back to top of page
  // for when you  click same navbuttons that are currently active
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // if you click sub, directs you to the section thats sub
  const scrollToSub = () => {
    if (document.getElementById("contact")) {
      return document
        .getElementById("contact")
        .scrollIntoView({ block: "center", behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        return document
          .getElementById("contact")
          .scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
    }
  };

  const scrollTypefaces = () => {
    if (document.getElementById("typefaces")) {
      return document
        .getElementById("typefaces")
        .scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        return document.getElementById("typefaces").scrollIntoView();
      }, 50);
    }
  };

  return (
    <ul className="navBarUl">
      <div onClick={() => setActiveTab("/")}>
        <LogoButton backgroundColor={backgroundColor} />
      </div>
      <div className="LinksContainer">
        <ToggleMenuButton
          showButtons={showButtons}
          handleShowButtons={handleShowButtons}
        />
        {buttonsObject.map(([index, obj]) => {
          return (
            <button
              key={index}
              className="uniqueLinkContainer"
              style={{
                display: showButtons ? "flex" : "",
                color: backgroundColor === "white" ? "black" : "white",
              }}
              onClick={() => {
                console.log(index);
                if (!obj._embedded.info.linkTo.includes("#")) {
                  navigate(obj._embedded.info.linkTo);
                }

                !obj._embedded.info.linkTo.includes("#")
                  ? setActiveTab(obj._embedded.info.linkTo.toLowerCase())
                  : obj._embedded.info.linkTo.includes("#") &&
                    !document.getElementById("contact")
                  ? setActiveTab("/")
                  : "";

                if (obj._embedded.info.linkTo.includes("#")) {
                  console.log("sub");
                  scrollToSub();
                }

                if (obj._embedded.info.linkTo.includes("/")) {
                  console.log("typefaces");
                  scrollTypefaces();
                }

                if (
                  !obj._embedded.info.linkTo.includes("#") &&
                  !obj._embedded.info.linkTo.includes("/")
                ) {
                  scrollToTop();
                }

                setShowButtons(false);
              }}
            >
              <span className="keyTextSpan">
                <h2
                  className="keyText"
                  style={{
                    fontVariationSettings:
                      obj._embedded.info.linkTo === activeTab
                        ? "'wght' 820"
                        : "",
                  }}
                >
                  {addSpaceBeforeCaps(firstLetterCapital(index))}
                </h2>
              </span>
              <span className="keyTextSpanHidden">
                <h2>{addSpaceBeforeCaps(firstLetterCapital(index))}</h2>
              </span>
            </button>
          );
        })}
      </div>
    </ul>
  );
};

const NavBarComponent = ({ backgroundColor, data }) => {
  const [showButtons, setShowButtons] = useState(false);
  const handleShowButtons = () => setShowButtons(!showButtons);

  console.log(backgroundColor);

  if (data) {
    return (
      <div
        className="navBarContainer"
        onMouseLeave={() => setShowButtons(false)}
        style={{
          backgroundColor: backgroundColor,
          color: backgroundColor === "black" ? "white" : "black",
          borderBottom:
            backgroundColor === "white" ? "2px solid black" : "2px solid white",
        }}
      >
        <NavButtons
          backgroundColor={backgroundColor}
          data={data}
          showButtons={showButtons}
          setShowButtons={setShowButtons}
          handleShowButtons={handleShowButtons}
        />
      </div>
    );
  }
};

export default React.memo(NavBarComponent);
