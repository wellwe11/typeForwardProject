import "./SERVICES.scss";
import SubscribeComponent from "../HOME/SUBSCRIBE/SUBSCRIBE";

import fontModificationIcon from "../../resourceFolder_typeFoward/assets/images/desktop-small-font-modification.svg";
import customTypefaceIcon from "../../resourceFolder_typeFoward/assets/images/desktop-small-custom-typeface.svg";
import designServiceIcon from "../../resourceFolder_typeFoward/assets/images/desktop-small-design-services.svg";
import customLicensingIcon from "../../resourceFolder_typeFoward/assets/images/desktop-small-custom-licensing.svg";
import BorderWithBorderBox from "../abstract_components/borderWithBorder";

const TypeServices = ({ sections }) => {
  const sectionEntries = Object.entries(sections);
  console.log(sectionEntries);
  return (
    <div className="typeServiceSection">
      <div className="typeServicesContainer">
        <div className="innerWidthContainer">
          <h1 className="typeServicesTitle">Type Services</h1>
          <div className="typeServicesIconsContainer">
            {sectionEntries.map((entry, index) => (
              <div key={index} className="outerContainer">
                <BorderWithBorderBox
                  img={entry[1].icon}
                  button={true}
                  event={""}
                  backgroundColor="black"
                  textSize="h2"
                >
                  {entry[0]}
                </BorderWithBorderBox>
              </div>
            ))}
          </div>
          <div className="typeServiceText">
            <div className="typeServiceTextOne">
              <span>
                <h3 className="bold">
                  Whether it’s one of our finely-tuned creations, a custom-built
                  font, tailor-made lettering or an exclusive logotype, your
                  brand deserves a competitive edge. So why wait?
                </h3>
                <br />
                <h3 className="thin">
                  At Type Forward, we believe in the power of individuality and
                  strive to offer a full range of services that will serve
                  everyone, from newly-minted startups to veteran players.
                  Choose from our library of meticulously crafted fonts or get
                  in touch for a custom-built product explicitly designed for
                  your requirements. Rejuvenate your visual identity with a
                  brand new logotype, or get in touch to learn more about our
                  numerous licensing options. No matter the project, we are here
                  to help bring your business to a higher standard.
                </h3>
              </span>
            </div>
            <div className="typeServiceTextTwo">
              <span>
                <h3 className="thin">
                  Have a question? Feel free to email us at
                </h3>
                <button className="mailButton">
                  <h3 className="bold">contact@typeforward.com</h3>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sections = ({ sections }) => {
  const sectionsObject = Object.keys(sections);
  const sectionEntries = Object.entries(sections);
  console.log(sectionEntries);
  return (
    <div className="sectionsContainer">
      <div className="contentContainer">
        {sectionEntries.map((section, index) => (
          <section key={index} className="section">
            <header>
              <h1>{section[0]}</h1>
            </header>
            <div className="sectionWrapper">
              <main className="sectionContent">
                <h4>{section[1].text}</h4>
              </main>
              <aside className="imageContainer">
                <BorderWithBorderBox
                  img={section[1].icon}
                  button={true}
                  event={""}
                  backgroundColor="white"
                  textSize="h2"
                >
                  {section[0]}
                </BorderWithBorderBox>
              </aside>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

const SectionComponent = ({ sectionRef }) => {
  const sections = {
    "Font Modification": {
      name: "Font Modification",
      icon: fontModificationIcon,
      text: (
        <span>
          <h3 className="bold">
            Got your eyes on one of our creations, but feeling like it needs a
            touch of uniqueness to better express your brand values?
          </h3>
          <h3 className="thin">
            Our library fonts can be modified to fit your product and create a
            distinct and unmistakable identity. This includes adding support for
            various languages, adapting individual symbols, incorporating
            OpenType features, or even converting a pre-existing font. No need
            to worry about copycats either - the end result will carry a unique
            name of your choosing and a specific license that fits your
            particular requirements.
          </h3>
        </span>
      ),
    },
    "Custom Typeface": {
      name: "Custom Typeface",
      icon: customTypefaceIcon,
      text: (
        <span>
          <h3 className="bold">
            Suppose you are having trouble picking a favourite from our
            wide-ranging catalogue. In that case, we are ready to work with your
            team and build you a custom, fully functional typeface from scratch.
          </h3>
          <h3 className="thin">
            This powerful tool will serve as a statement of intent on behalf of
            your brand and give you complete control over how others perceive
            it. And the process doesn’t end there – we will sign off on any
            creation of ours only after we make sure it works just as intended
            to suit your style. That includes the line of commerce, technical
            environment, target audience and overall vision.
          </h3>
        </span>
      ),
    },
    "Design Services": {
      name: "Design Services",
      icon: designServiceIcon,
      text: (
        <span>
          <h3 className="bold">
            A well-designed logo can imprint itself on your potential customers
            and serve as a conduit for your brand’s values, purpose and service.
          </h3>
          <h3 className="thin">
            We are always happy to share our experience in graphic design and
            help you put a fresh new spin on your visual identity. Logotype,
            trademark, custom lettering or overall identity are cornerstones of
            a successful business. That is how your clients remember your brand
            and create positive, relevant associations with it.
            Type&nbsp;Forward will be with you through every step of the
            journey, from colours and symbols to typography and icons. (And yes,
            we can hold hands too.)
          </h3>
        </span>
      ),
    },
    "Custom Licensing": {
      name: "Custom Licensing",
      icon: customLicensingIcon,
      text: (
        <span>
          <h3 className="bold">
            Sometimes the essentials just might not be enough. Don’t worry – we
            got you covered.
          </h3>
          <h3 className="thin">
            Need your font license to go the extra mile? We are ready with
            made-to-measure options for all our partners, such as enterprise
            licenses for large companies or broadcast packages suitable for
            television or cinema projects. You can test any font using a trial
            version. Or even purchase a full buyout license that guarantees you
            the right to use the typeface in any setting, with no restrictions
            in terms of medium, format or timespan - all for one single fee.
          </h3>
        </span>
      ),
    },
  };

  return (
    <div>
      <section
        className="sectionBlack"
        ref={(el) => (sectionRef.current[5] = el)}
      >
        <TypeServices sections={sections} />
      </section>
      <section
        className="sectionWhite"
        ref={(el) => (sectionRef.current[6] = el)}
      >
        <Sections sections={sections} />
      </section>
    </div>
  );
};

const ServicesComponent = ({ sectionRef }) => {
  return (
    <div className="servicesComponentContainer">
      <SectionComponent sectionRef={sectionRef} />
      <SubscribeComponent sectionRef={sectionRef} />
    </div>
  );
};

export default ServicesComponent;
