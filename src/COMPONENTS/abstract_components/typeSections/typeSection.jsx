import "./typeSection.scss";

import { useEffect, useState } from "react";
import SizeContainerComponent from "../sizeContainer/sizeContainerComponent";
import fetchText from "../../../functions/importFont";
import fetchWholeMd from "../../../functions/fetchWholeMd";
import { TypeFaceComponent } from "../../HOME/TYPEFACE";
import BorderWithBorderBox from "../borderWithBorder";

const ButtonContainer = () => {
  return (
    <div className="typeButtons">
      <div className="typeButtonContainer">
        <BorderWithBorderBox eventHandler={"button"} backgroundColor="black">
          Buy ↗
        </BorderWithBorderBox>
      </div>
      <div className="typeButtonContainer">
        <BorderWithBorderBox eventHandler={"button"} backgroundColor="black">
          Download ↓
        </BorderWithBorderBox>
      </div>
    </div>
  );
};

const TypeSideComponent = ({ type }) => {
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    const getWholeBio = async () => {
      const fontBlogBio = await fetchWholeMd(type[1].fontBlog.bio[0].url);
      setArtists(fontBlogBio.artists);
    };

    getWholeBio();
  }, [type]);

  return (
    <div className="typeInfoContainer">
      <TypeFaceComponent type={type} fontColor="white">
        {artists && (
          <>
            {`Designed by ${artists[0]} ${
              artists.length > 1 ? "and " + artists[1] : ""
            }${artists.length > 2 ? artists.slice(2) : ""} `}
          </>
        )}
      </TypeFaceComponent>
    </div>
  );
};

const TypeHeader = ({ type }) => {
  console.log(type);

  return (
    <SizeContainerComponent>
      <div className="typeHeader">
        <TypeSideComponent type={type} />
        <ButtonContainer />
      </div>
    </SizeContainerComponent>
  );
};

export default TypeHeader;
