import { GiFlowerEmblem } from "react-icons/gi";
import imgTriangle from "../img/icons8-triangle-color-96.png";

import useStories from "./uStory/store";

export default function Header() {
  const {isUStoryCreating, setIsUStoryCreating} = useStories();


  return (
    <>
      <span className="pre-header hide-on-small-device">
        Breath in the depth of colors and geometry, jump in and enjoooooy!
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
        <h1>Enjoy the Photos2</h1>
      </header>
    </>
  );
}
