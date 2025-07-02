import "./componentTitle.scss";

const H_OneComponent = ({ title, textColor = "white", textSize = 6 }) => {
  const lineHeight = textSize + 1;

  const minsSize = 30;
  const maxSize = 80;
  return (
    <h1
      className="title"
      style={{
        color: textColor,
        fontSize: textSize
          ? `clamp(${minsSize}px, ${textSize}vw, ${maxSize}px)`
          : "",
        lineHeight: textSize
          ? `clamp(${minsSize + 10}px, ${lineHeight}vw, ${maxSize}px)`
          : "",
        paddingBottom: textSize,
      }}
    >
      {title}
    </h1>
  );
};

export default H_OneComponent;
