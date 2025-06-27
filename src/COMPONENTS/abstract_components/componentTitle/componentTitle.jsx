import "./componentTitle.scss";

const H_OneComponent = ({ title, textColor, textSize }) => {
  const lineHeight = textSize + 1;

  console.log(title);

  const minsSize = 50;
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
