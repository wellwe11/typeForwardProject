import { useEffect, useRef, useState } from "react";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";

import "./HOME.scss";
import TypeComponent from "./TYPEFACE";
import TypeServicesComponent from "./TYPE_SERVICES";
import SubsrcibeComponent from "./SUBSCRIBE/SUBSCRIBE";

const CurrentImageDotComp = ({ array, activeIndex, setActiveIndex }) => {
  console.log(activeIndex);
  return (
    <div className="currentImageDotCompContainer">
      {array.map((font, index) => (
        <button
          onClick={() => setActiveIndex(index)}
          className={`dot ${activeIndex === index ? "activeDot" : ""}`}
        >
          <div className="innerDot"></div>
        </button>
      ))}
    </div>
  );
};

const ForwardWelcomeComponent = ({}) => {
  const navLinks = useNavLinks();

  const [activeFontIndex, setActiveFontIndex] = useState(2);
  const flexibleFonts = ["Oddval", "EmOne", "Gogh"];
  const [fontButtonsHover, setFontButtonsHover] = useState(false);
  const handleFontButtonsHover = () => setFontButtonsHover(!fontButtonsHover);

  // click container to change font
  // will need to update in future if API-structure changes (since actual font-names include spaces)
  const changeFont = () => {
    if (!navLinks) return "Oddval";

    if (activeFontIndex === flexibleFonts.length - 1)
      return setActiveFontIndex(0);

    return setActiveFontIndex((prev) => prev + 1);
  };

  const textRef = useRef(null);
  const animationFrame = useRef(null);

  const handleMouseMove = (e) => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);

    animationFrame.current = requestAnimationFrame(() => {
      const x = e.clientX / 1000;
      const y = e.clientY * 1.2;

      if (textRef.current) {
        textRef.current.style.fontVariationSettings = `'wght' ${y}, 'wdth' ${x}`;

        if (x > 0.2 && x < 1) {
          textRef.current.style.transform = `scaleX(${x})`;
          textRef.current.style.display = "inline-block";
        }
      }
    });
  };

  useEffect(() => {
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div
      className="forwardWelcome"
      onMouseMove={!fontButtonsHover ? handleMouseMove : null}
      onClick={!fontButtonsHover ? changeFont : null}
    >
      <div className="welcomeTextContainer">
        <h1
          ref={textRef}
          className="welcomeText"
          style={{
            fontFamily: `${
              !navLinks
                ? "font-Forward"
                : "font-" + flexibleFonts[activeFontIndex]
            }, sans-serif`,
          }}
        >
          forward
        </h1>
      </div>
      <div
        className="dotContainer"
        onMouseEnter={handleFontButtonsHover}
        onMouseLeave={handleFontButtonsHover}
      >
        <CurrentImageDotComp
          array={flexibleFonts}
          activeIndex={activeFontIndex}
          setActiveIndex={setActiveFontIndex}
        />
      </div>
    </div>
  );
};

const HomeComponent = () => {
  return (
    <div className="homeContainer">
      <ForwardWelcomeComponent />
      <TypeComponent />
      <TypeServicesComponent />
      <SubsrcibeComponent />
    </div>
  );
};

export default HomeComponent;

// type services learn more direct to services page
// email input needs to add warning if no email is entered
// add button to email input
// fix fonts to typefaces
// navbar change color on scroll
// add functionality to footer
