import "./sizeContainerComponent.scss";

const SizeContainerComponent = ({
  children,
  sectionColor = "black",
  sectionRef,
}) => {
  const firstLetterCapital = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <section
      className={`section${firstLetterCapital(sectionColor)}`}
      ref={sectionRef}
    >
      <div className="sectionContainer">
        <div className="contentContainer">
          <div className="innerWidthContainer">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default SizeContainerComponent;
