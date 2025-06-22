import "./ABOUTUS.scss";
import { Sections } from "../SERVICES/SERVICES_component";

import muraImage from "../../resourceFolder_typeFoward/assets/images/mura.png";
import muraSketch from "../../resourceFolder_typeFoward/assets/images/mura.svg";
import stanImage from "../../resourceFolder_typeFoward/assets/images/stan.png";
import stanSketch from "../../resourceFolder_typeFoward/assets/images/stan.svg";

import BoldAndThinText from "../abstract_components/boldAndThinText/boldAndThinText";

const profiles = {
  "Mirela Belova": {
    name: "Mirela Belova",
    images: {
      default: muraImage,
      others: [muraSketch],
    },

    text: (
      <BoldAndThinText
        boldText={
          "I am drawn to the problem-solving aspect of type design, and all the technical stuff doesn’t scare me."
        }
        thinText={
          "My career in type design started five years ago following a workshop on the subject. Before that, I studied Graphic Design at NBU and was particularly interested in the more nerdy part of the design process. Shortly after the workshop, I joined Fontfabric Type Foundry. I learned to love all things type there and met my coworker Stan. Recently we decided to team up and start our independent type foundry - Type Forward."
        }
        amountOfSpace={2}
      />
    ),
  },
  "Stan Partalev": {
    name: "Stan Partalev",
    images: {
      default: stanImage,
      others: [stanSketch],
    },

    text: (
      <BoldAndThinText
        boldText={
          "I explore various aspects of urban life, culture, and history through media such as posters, typography, lettering and other design practices."
        }
        thinText={
          "Starting as a graffiti artist, I have been interested in visual arts and design since I can remember. That led me to the National Academy of Arts, Sofia, where I graduated with “Poster and Visual Communication BA”, and “Poster MA”. I then joined a renowned type foundry, where I developed and improved my understanding of typography and type design skills. In 2020 I became a part of the newly created foundry Type Forward."
        }
        amountOfSpace={2}
      />
    ),
  },
};

const AboutUsProfile = () => {
  return <Sections />;
};
