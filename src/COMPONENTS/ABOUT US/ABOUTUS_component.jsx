import H_OneComponent from "../abstract_components/componentTitle/componentTitle";
import ContactUsComp from "../abstract_components/contactUs/contactUs";
import LinkImagesComponent from "../abstract_components/smallIcons/smallIconsComponent";

const AboutUsComponent = () => {
  return (
    <section className="sectionBlack">
      <div>
        <H_OneComponent title={"About us"} />
        <div>
          <div>
            <span>
              <h3 className="bold">
                Type Forward is an independent type foundry founded by us - Stan
                Partalev and Mirela Belova.
              </h3>
              <br />
              <h3 className="thin">
                After working together with significant ease for the past few
                years, we decided it was time to team up. We started out as
                visual artists in various fields. However, we both found
                ourselves most inspired when creating functional designs, which
                in time grew into a passion for typography and type design.
                Driven by shared vision and inspiration, we focus on producing
                high-quality original fonts with great technological care. Now
                with several years of experience working on different successful
                typefaces, we are ever so motivated to share what we are capable
                of.
              </h3>
            </span>
          </div>
          <div>
            <ContactUsComp color={"white"} />
            <LinkImagesComponent sectionColor={"black"} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsComponent;
