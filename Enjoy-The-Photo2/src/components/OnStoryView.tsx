import { useState } from "react";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import { cc } from "../utils/cc";
import UStory from "../interfacesAndTypes/UStory";

interface Props {
  uStory: UStory;
}

export default function OnStoryView({ uStory }: Props) {
  const [topPosition, setTopPosition] = useState(true);
  const [showArrow, setShowArrow] = useState(false);

  function handleMouseEnter() {
    setShowArrow(true);
  }

  function handleMouseLeave() {
    setShowArrow(false);
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setTopPosition((s) => !s)}
      className={cc("on-story-view-container", topPosition ? "top" : "bottom")}
      title="Click to move it up or down"
    >
      <img src={uStory.body[uStory.body.length - 1].urls.small} />
      <div className="counter" title="Number of photos in current uStory">
        {uStory.body.length}
      </div>
      {showArrow && (
        <div className="arrows">
          {topPosition ? <FiArrowDownCircle /> : <FiArrowUpCircle />}
        </div>
      )}
    </div>
  );
}
