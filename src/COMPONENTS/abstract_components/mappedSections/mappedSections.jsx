import { useEffect, useState } from "react";
import "./mappedSections.scss";

import BorderWithBorderBox from "../borderWithBorder";
import firstLetterCapital from "../../../functions/turnFirstLetterCapital";
import fetchText from "../../../functions/importFont";
import SizeContainerComponent from "../sizeContainer/sizeContainerComponent";
import BoldAndThinText from "../boldAndThinText/boldAndThinText";

const ProfileImage = ({ children, data, canHover, linkOrButton, event }) => {
  const [pictureHover, setPictureHover] = useState(false);
  const [images, setImages] = useState([]);

  const findMainImage = (...urls) => {
    return {
      mainImage: urls[0].filter((u) => u.url.includes("main")),
      rest: urls[0].filter((u) => !u.url.includes("main")),
    };
  };

  useEffect(() => {
    if (data) {
      setImages(findMainImage(data));
    }
  }, []);

  const handleHover = () => setPictureHover(!pictureHover);

  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className="profilePictureContainer"
    >
      {canHover ? (
        !pictureHover ? (
          <BorderWithBorderBox
            img={images.mainImage?.[0].url}
            backgroundColor="white"
            eventHandler={linkOrButton}
            event={event}
          >
            {children}
          </BorderWithBorderBox>
        ) : (
          <BorderWithBorderBox
            img={images.rest?.[0].url}
            backgroundColor="white"
            eventHandler={linkOrButton}
            event={event}
          >
            {children}
          </BorderWithBorderBox>
        )
      ) : (
        <BorderWithBorderBox
          img={images.rest?.[0].url}
          backgroundColor="white"
          eventHandler={linkOrButton}
          event={event}
        >
          {children}
        </BorderWithBorderBox>
      )}
    </div>
  );
};

const ProfileText = ({ data, fontColor }) => {
  const [thinText, setThinText] = useState("");
  const [boldText, setBoldText] = useState("");

  useEffect(() => {
    if (data) {
      fetchText(data, setThinText, setBoldText);
    }
  }, []);
  return (
    <div>
      <BoldAndThinText
        boldText={boldText}
        thinText={thinText}
        amountOfSpace={2}
        fontColor={fontColor || "black"}
      />
    </div>
  );
};

const ProfileSocials = () => {};

const Profile = ({
  profile,
  data,
  canHover,
  linkOrButton,
  event,
  eventName,
  fontColor,
}) => {
  const text = data.bio?.[0].url;
  const images = data?.images;
  const name = firstLetterCapital(profile);

  return (
    <div className="profileContainer">
      <div
        className="profileNameContainer"
        style={{ borderBottom: "2px solid " + fontColor }}
      >
        <h1 className="profileName" style={{ color: fontColor }}>
          {name}
        </h1>
      </div>

      <div className="profileContent">
        <div className="leftSide">
          <ProfileText data={text} fontColor={fontColor} />
          <ProfileSocials />
        </div>
        <div className="rightSide">
          <ProfileImage
            data={images}
            canHover={canHover}
            linkOrButton={linkOrButton}
            event={event}
          >
            {eventName || name}
          </ProfileImage>
        </div>
      </div>
    </div>
  );
};

const Profiles = ({
  data,
  canHover,

  sectionColor,
  linkOrButton,
  event,
  eventName,
  fontColor = sectionColor === "black" ? "white" : "black",
}) => {
  console.log(data);

  return (
    <SizeContainerComponent sectionColor={sectionColor || "white"}>
      <div className="profilesContainer">
        {data.map(([key, value]) => (
          <div key={`${key} profile`} className="profileContainer">
            <Profile
              profile={key}
              data={value}
              canHover={canHover}
              linkOrButton={linkOrButton}
              event={event}
              eventName={eventName}
              fontColor={fontColor}
              sectionColor={sectionColor}
            />
          </div>
        ))}
      </div>
    </SizeContainerComponent>
  );
};

const ProfilesComponent = ({
  data,
  canHover,
  section,
  sectionColor,
  linkOrButton,
  event,
  eventName,
}) => {
  const dataServices = Object.entries(data[section]);

  if (dataServices) {
    const filteredData = dataServices.filter(
      ([key, value]) => value !== section && key !== "bio"
    );

    console.log(filteredData);
    return (
      <div className="profilesComponentContainer">
        <Profiles
          data={filteredData}
          canHover={canHover}
          sectionColor={sectionColor}
          linkOrButton={linkOrButton}
          event={event}
          eventName={eventName}
          section={section}
        />
      </div>
    );
  }
};

export default ProfilesComponent;
