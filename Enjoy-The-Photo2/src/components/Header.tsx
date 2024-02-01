import { GiFlowerEmblem } from "react-icons/gi";
import imgTriangle from "../img/icons8-triangle-color-96.png";
import { NavLink } from "react-router-dom";
import useStories from "./uStory/store";
import ActiveText from "./ActiveText";
import { useEffect, useState } from "react";
import { SENTENCES_FOR_ACTIVE_TEXT } from "../data/defaultData";

export default function Header() {
  const { isUStoryCreating, setIsUStoryCreating } = useStories();
  const [activeText, setActiveText] = useState<string>(
    SENTENCES_FOR_ACTIVE_TEXT[0]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let newActiveText = randomTextFromArray(SENTENCES_FOR_ACTIVE_TEXT);
      setActiveText(newActiveText);
    }, 21000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <span className="pre-header hide-on-small-device" title="click to search">
        <ActiveText>{activeText}</ActiveText>
      </span>
      <header className="header">
        <div className="symbol">
          {isUStoryCreating ? (
            <GiFlowerEmblem
              onClick={() => setIsUStoryCreating(false)}
              title="STOP uStory creation"
            />
          ) : (
            <img src={imgTriangle} />
          )}
        </div>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
          title="Home"
        >
          Enjoy the Photos2
        </NavLink>
      </header>
    </>
  );
}

function randomTextFromArray(sourceArray: string[]): string {
  const randomIndex = Math.floor(Math.random() * sourceArray.length);
  return sourceArray[randomIndex];
}
