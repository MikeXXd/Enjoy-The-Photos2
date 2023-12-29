import { useState } from "react";
import { UStoryType } from "../App";
import { cc } from "../utils/cc";

interface Props {
  uStory: UStoryType;
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
    >
      <img src={uStory.body[uStory.body.length - 1].urls.small} />
      <div className="counter">{uStory.body.length}</div>
      {showArrow && (
        <div className="arrow">
          {topPosition ? "move it down" : "move it up"}
        </div>
      )}
    </div>
  );
}
