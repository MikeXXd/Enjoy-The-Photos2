import { GiFlowerEmblem } from "react-icons/gi";
import imgTriangle from "../img/icons8-triangle-color-96.png";

import { NavLink } from "react-router-dom";
import useStories from "./uStory/store";
import ActiveText from "./ActiveText";

export default function Header() {
  const { isUStoryCreating, setIsUStoryCreating } = useStories();

  return (
    <>
      <span className="pre-header hide-on-small-device" title="click to search">
        <ActiveText >Breath in the depth of colors and geometry, jump in and enjoooooy!</ActiveText>
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
