const BoldAndThinText = ({
  boldText,
  boldWeight = 600,
  thinText,
  thinWeight = 400,
  fontType = "h3",
  amountOfSpace = 2,
  fontColor = "white",
}) => {
  const FontTag = fontType;

  const handleAmountOfSpace = () => {
    let amount = [];
    for (let i = 0; i < amountOfSpace; i++) {
      amount.push(<br key={i} />);
    }

    return amount;
  };

  const BrSpace = handleAmountOfSpace();

  return (
    <span className="componentText">
      <FontTag
        className="bold"
        style={{ fontWeight: boldWeight, color: fontColor }}
      >
        {boldText}
      </FontTag>
      {BrSpace}
      <FontTag
        className="thin"
        style={{ fontWeight: thinWeight, color: fontColor }}
      >
        {thinText}
      </FontTag>
    </span>
  );
};

export default BoldAndThinText;
