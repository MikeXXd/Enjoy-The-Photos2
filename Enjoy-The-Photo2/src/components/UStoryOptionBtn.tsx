import { useState } from "react";
import Photo from "../interfacesAndTypes/Photo";
import usePhotos from "../context/usePhotos";
import useStories from "./uStory/store";
import { useNavigate } from "react-router-dom";

interface Props {
  word: string;
  photo: Photo;
}
// onClick > component adds photo to uStory
// if word === query > no new query will be set and the rendered photos will stay the same, otherwise query set to word

export default function UStoryOptionBtn({ word, photo }: Props) {
  const { setNewQuery, query } = usePhotos();
  const { addingUStory } = useStories();
  const [addedToStory, setAddedToStory] = useState(false);
  const navigate = useNavigate();

  function handleOnClick() {
    addingUStory(photo, word, query);
    if (word !== query) {
      setNewQuery(word);
      navigate("/");
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
      {word !== query ? word : addedToStory ? "ADDED to uStory" : "ONLY ADD"}
    </button>
  );
}
