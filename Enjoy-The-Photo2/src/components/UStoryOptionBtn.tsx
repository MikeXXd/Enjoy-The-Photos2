import { PhotoType } from "../context/Photos";
import useApp from "../context/useApp";
import usePhotos from "../context/usePhotos";

interface Props {
  word: string;
  photo: PhotoType;
}

export default function UStoryOptionBtn({ word, photo }: Props) {
  const { setNewQuery } = usePhotos();
  const { arrangeUStory } = useApp();

  function handleOnClick() {
    arrangeUStory(photo);
    setNewQuery(word);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      className="btn u-story-option-btn"
      key={word}
      onClick={handleOnClick}
    >
      {word}
    </button>
  );
}
