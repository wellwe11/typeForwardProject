const BoldAndThinText = ({
  boldText,
  boldWeight = 600,
  thinText,
  thinWeight = 400,
  fontType = "h3",
  amountOfSpace = 2,
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
      <FontTag className="bold" style={{ fontWeight: boldWeight }}>
        {boldText}
      </FontTag>
      {BrSpace}
      <FontTag className="thin" style={{ fontWeight: thinWeight }}>
        {thinText}
      </FontTag>
    </span>
  );
};

export default BoldAndThinText;
