import { useEffect, useState } from "react";
import "./mappedSections.scss";

import BorderWithBorderBox from "../borderWithBorder";
import firstLetterCapital from "../../../functions/turnFirstLetterCapital";
import fetchText from "../../../functions/importFont";
import SizeContainerComponent from "../sizeContainer/sizeContainerComponent";
import BoldAndThinText from "../boldAndThinText/boldAndThinText";
import H_OneComponent from "../componentTitle/componentTitle";
import fetchSpecificItem from "../../../functions/fetchSpecificItem";

const ProfileImage = ({
  children,
  data,
  canHover,
  linkOrButton,
  event,
  sectionColor,
  ExternalImage,
}) => {
  const [pictureHover, setPictureHover] = useState(false);
  const [images, setImages] = useState([]);

  const findMainImage = (...urls) => {
    return {
      mainImage: urls[0].filter((u) => u.url.includes("main")) || [],
      rest: urls[0].filter((u) => !u.url.includes("main")) || {},
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
        <div>
          <div className="firstImage">
            <BorderWithBorderBox
              img={images.mainImage?.[0].url}
              backgroundColor={sectionColor === "white" ? "white" : "black"}
              eventHandler={linkOrButton}
              event={event}
            >
              {children}
            </BorderWithBorderBox>
          </div>

          <div
            className="secondImage"
            style={{ opacity: pictureHover ? "1" : "" }}
          >
            <BorderWithBorderBox
              img={images.rest?.[0].url}
              backgroundColor={sectionColor === "white" ? "white" : "black"}
              eventHandler={linkOrButton}
              event={event}
            >
              {children}
            </BorderWithBorderBox>
          </div>
        </div>
      ) : (
        <BorderWithBorderBox
          img={images.mainImage?.[0]?.url || images.rest?.[0]?.url}
          backgroundColor={sectionColor === "white" ? "white" : "black"}
          eventHandler={linkOrButton}
          event={event}
          ExternalImage={ExternalImage}
        >
          {children}
        </BorderWithBorderBox>
      )}
    </div>
  );
};

const ProfileText = ({
  data,
  fontColor,
  profileHeader,
  headerSize,
  sectionColor,
}) => {
  const [thinText, setThinText] = useState("");
  const [boldText, setBoldText] = useState("");

  useEffect(() => {
    if (data) {
      fetchText(data, setThinText, setBoldText);
    }
  }, []);

  return (
    <div className="profileText">
      <H_OneComponent
        textSize={headerSize}
        textColor={sectionColor === "white" ? "black" : "white"}
        title={profileHeader}
      />
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

export const Profile = ({
  profile,
  profileTitle,
  data,
  canHover,
  linkOrButton,
  event,
  eventName,
  fontColor,
  sectionColor,
  flexOrder,
  profileHeader,
  headerSize,
  ExternalImage,
}) => {
  const text = data.bio?.[0].url;
  const images = data?.images;
  const name = firstLetterCapital(profile);

  const [specificTitle, setSpecificTitle] = useState("");

  if (data.bio) {
    const fetchItems = async () => {
      const fetchedText = await fetchSpecificItem(data.bio[0].url, "bigTitle");

      if (fetchedText) {
        setSpecificTitle(fetchedText);
      }
    };

    fetchItems();
  }

  return (
    <div className="profileContainer">
      <div
        className="profileNameContainer"
        style={{
          borderBottom:
            profileTitle && profileTitle?.toLowerCase().includes("no border")
              ? ""
              : "2px solid " + fontColor,
        }}
      >
        <h1 className="profileName" style={{ color: fontColor }}>
          {profileTitle && profileTitle?.toLowerCase().includes("no title")
            ? ""
            : profileTitle || name}
        </h1>
      </div>

      <div className="profileContent">
        <div className="leftSide" style={{ order: flexOrder === 1 ? 2 : "" }}>
          <ProfileText
            data={text}
            fontColor={fontColor}
            profileHeader={specificTitle || profileHeader}
            headerSize={headerSize}
            sectionColor={sectionColor}
          />
          <ProfileSocials />
        </div>
        <div
          className="rightSide"
          style={{
            "--flex-order": flexOrder,
          }}
        >
          <ProfileImage
            data={images}
            canHover={canHover}
            linkOrButton={linkOrButton}
            event={event}
            sectionColor={sectionColor}
            ExternalImage={ExternalImage}
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
  profileTitle,
  sectionColor,
  linkOrButton,
  event,
  eventName,
  fontColor = sectionColor === "black" ? "white" : "black",
  flexOrder,
  profileHeader,
  headerSize,
  ExternalImage,
}) => {
  return (
    <SizeContainerComponent sectionColor={sectionColor || "white"}>
      <div className="profilesContainer">
        {data.map(([key, value], index) => (
          <div key={`${key} profile`} className="profileContainer">
            <Profile
              profileTitle={profileTitle}
              profile={key}
              data={value}
              canHover={canHover}
              linkOrButton={linkOrButton}
              event={event && event.length > 0 ? event[index] : event}
              eventName={eventName}
              fontColor={fontColor}
              sectionColor={sectionColor}
              flexOrder={flexOrder}
              profileHeader={profileHeader}
              headerSize={headerSize}
              ExternalImage={
                ExternalImage ? ExternalImage[index] || ExternalImage : ""
              }
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
  profileTitle,
  flexOrder,
  profileHeader,
  headerSize,
  ExternalImage,
}) => {
  const dataServices = Object.entries(data[section].services);

  if (dataServices) {
    return (
      <div className="profilesComponentContainer">
        <Profiles
          profileTitle={profileTitle}
          data={dataServices}
          canHover={canHover}
          sectionColor={sectionColor}
          linkOrButton={linkOrButton}
          event={event}
          eventName={eventName}
          section={section}
          flexOrder={flexOrder}
          profileHeader={profileHeader}
          headerSize={headerSize}
          ExternalImage={ExternalImage}
        />
      </div>
    );
  }
};

export default ProfilesComponent;
