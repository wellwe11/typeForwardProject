import React, { useEffect, useRef, useState, memo } from "react";
import { useNavLinks } from "../../TABCOMPONENTPROVIDER";

import "./HOME.scss";

import "../../index.scss";

import TypeComponent from "./TYPEFACE";
import SubsrcibeComponent from "../SUBSCRIBE/SUBSCRIBE";
import ProfilesComponent from "../abstract_components/mappedSections/mappedSections";

const CurrentImageDotComp = ({ array, activeIndex, setActiveIndex }) => {
  return (
    <div className="currentImageDotCompContainer">
      {array.map((_, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`dot ${activeIndex === index ? "activeDot" : ""}`}
        >
          <div className="innerDot"></div>
        </button>
      ))}
    </div>
  );
};

export const ForwardWelcomeComponent = ({ sectionRef }) => {
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
    <section className="sectionBlack" ref={sectionRef} data-theme="black">
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
    </section>
  );
};

const TypefacesComponent = ({ sectionRef, data }) => {
  if (data.Typefaces?.fonts) {
    return (
      <div className="homeContainer">
        <ForwardWelcomeComponent
          sectionRef={(el) => (sectionRef.current[0] = el)}
        />

        <TypeComponent
          sectionRef={(el) => (sectionRef.current[1] = el)}
          data={data}
        />

        <ProfilesComponent
          data={data}
          profileTitle={"no title, no border"}
          profileHeader={"Type Services"}
          canHover={false}
          section={"Typefaces"}
          sectionColor={"black"}
          linkOrButton={"Link"}
          event={"services"}
          eventName={"Learn more"}
          flexOrder={2}
          sectionRef={(el) => (sectionRef.current[2] = el)}
        />
        <SubsrcibeComponent sectionRef={(el) => (sectionRef.current[3] = el)} />
      </div>
    );
  }
};

export default TypefacesComponent;
