import "./navSVG.scss";

const NavBarSVG = ({ showButtons, handleShowButtons, backgroundColor }) => {
  return (
    <svg
      className={`hb ${showButtons ? "open" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      stroke="#eee"
      strokeWidth=".6"
      fill="black"
      onClick={handleShowButtons}
      stroke={backgroundColor === "black" ? "white" : "black"}
    >
      <line className="line top" x1="2" y1="3" x2="8" y2="3" />
      <line className="line middle" x1="2" y1="5" x2="8" y2="5" />
      <line className="line bottom" x1="2" y1="7" x2="8" y2="7" />
    </svg>
  );
};

export default NavBarSVG;
