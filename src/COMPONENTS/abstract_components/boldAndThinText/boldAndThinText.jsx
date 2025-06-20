const BoldAndThinText = ({
  boldText,
  thinText,
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
      <FontTag className="bold">{boldText}</FontTag>
      {BrSpace}
      <FontTag className="thin">{thinText}</FontTag>
    </span>
  );
};

export default BoldAndThinText;
