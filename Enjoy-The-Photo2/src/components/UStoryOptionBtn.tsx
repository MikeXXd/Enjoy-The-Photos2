import { useState } from "react";
import { PhotoType } from "../context/Photos";
import useApp from "../context/useApp";
import usePhotos from "../context/usePhotos";

interface Props {
  word: string;
  photo: PhotoType;
}
// onClick > component adds photo to uStory
// if word === query > no new query will be set and the rendered photos will stay the same, otherwise query set to word

export default function UStoryOptionBtn({ word, photo }: Props) {
  const { setNewQuery, query } = usePhotos();
  const { arrangeUStory } = useApp();
  const [addedToStory, setAddedToStory] = useState(false);

  function handleOnClick() {
    arrangeUStory(photo, word);
    if (word !== query) {
      setNewQuery(word);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setAddedToStory(true);
  }

  return (
    <button
      className="btn u-story-option-btn"
      style={addedToStory ? { color: "green", fontWeight: "bold" } : {}}
      key={crypto.randomUUID()}
      onClick={handleOnClick}
    >
      {word !== query
        ? word
        : addedToStory
        ? "ADDED to uStory"
        : "add to USTORY"}
    </button>
  );
}
