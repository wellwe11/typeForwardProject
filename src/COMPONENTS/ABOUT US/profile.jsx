const ProfilesComponentSomething = ({
  data,
  canHover,
  section,
  sliceAmount,
  sectionColor,
  linkOrButton,
  event,
  eventName,
}) => {
  const dataServices = Object.entries(data[section]);

  if (dataServices) {
    return (
      <div className="profilesComponentContainer">
        {/* <Profiles
          data={dataServices}
          canHover={canHover}
          sliceAmount={sliceAmount}
          sectionColor={sectionColor}
          linkOrButton={linkOrButton}
          event={event}
          eventName={eventName}
        /> */}
      </div>
    );
  }
};

export default ProfilesComponentSomething;
