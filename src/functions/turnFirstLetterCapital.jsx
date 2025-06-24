const firstLetterCapital = (string) =>
  string
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default firstLetterCapital;
