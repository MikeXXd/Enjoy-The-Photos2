import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Photo from "../interfacesAndTypes/Photo";
import useGallery from "./gallery/store";

interface Props {
  photo: Photo;
  colorFillHeart?: string;
  colorOutLineHeart?: string;
}

const IconHeart = ({
  photo,
  colorFillHeart = "rgb(238, 93, 93)",
  colorOutLineHeart = "pink",
}: Props) => {
  const { isInGallery, arrangeGallery } = useGallery();

  function handleHeartIcon() {
    arrangeGallery(photo);
  }

  return (
    <>
      {isInGallery(photo) ? (
        <AiFillHeart
          onClick={handleHeartIcon}
          fill={colorFillHeart}
          title="In Gallery"
        />
      ) : (
        <AiOutlineHeart
          onClick={handleHeartIcon}
          fill={colorOutLineHeart}
          title="Save to Gallery"
        />
      )}
    </>
  );
};

export default IconHeart;
