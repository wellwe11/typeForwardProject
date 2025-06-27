import "./componentTitle.scss";

const H_OneComponent = ({ title, textColor }) => {
  return (
    <h1 className="title" style={{ color: textColor }}>
      {title}
    </h1>
  );
};

export default H_OneComponent;
