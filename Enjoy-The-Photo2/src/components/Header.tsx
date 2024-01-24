import { GiFlowerEmblem } from "react-icons/gi";
import imgTriangle from "../img/icons8-triangle-color-96.png";

import useApp from "../context/useApp";

export default function Header() {
    const {setIsUStoryCreating, isUStoryCreating } = useApp();
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
