import "./typeOverview.scss";
import { useEffect, useState } from "react";
import SizeContainerComponent from "../../sizeContainer/sizeContainerComponent";

const TypeOverviewComponent = ({ data }) => {
  const [overviewImage, setOverviewImage] = useState(null);
  useEffect(() => {
    if (!data) return;
    const imagesFile = data?.[1].fontBlog.overview_images.images;
    const imagesArray = {
      clean: [],
      characteristics: [],
    };
    if (imagesFile) {
      imagesFile.forEach((file) => {
        if (file.url.includes("characteristics")) {
          imagesArray.characteristics.push(file);
        } else {
          imagesArray.clean.push(file);
        }
      });

      setOverviewImage(imagesArray);
    }
  }, [data]);

  if (overviewImage) {
    console.log(overviewImage);
    return (
      <SizeContainerComponent sectionColor="black">
        <div className="typeOverview">
          <div className="boxHoverViewerContainer">
            <div className="boxHoverViewer">
              <img
                className="typeOverviewCLean"
                src={overviewImage.characteristics[0].url}
                alt=""
              />
            </div>
          </div>
          <div className="imagesContainer">
            <img
              className="typeOverviewCharacteristics"
              src={overviewImage.clean[0].url}
              alt=""
            />
          </div>
        </div>
      </SizeContainerComponent>
    );
  }
};

export default TypeOverviewComponent;
