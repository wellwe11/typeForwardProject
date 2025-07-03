import "./roundButton.scss";

const RoundButton = ({ hover }) => {
  return (
    <div className={`svgRoundButtonContainer ${hover ? "isHovered" : ""}`}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polygon points="16,6 6,12 16,18" fill="black" />
      </svg>
    </div>
  );
};

export default RoundButton;
