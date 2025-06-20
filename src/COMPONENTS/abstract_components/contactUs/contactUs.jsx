import "./contactUs.scss";

const ContactUsComp = ({ color }) => {
  return (
    <span>
      <h3 style={{ color: color }} className="thin">
        Have a question? Feel free to email us at
      </h3>
      <button className="mailButton">
        <h3 style={{ color: color }} className="bold">
          contact@typeforward.com
        </h3>
      </button>
    </span>
  );
};

export default ContactUsComp;
