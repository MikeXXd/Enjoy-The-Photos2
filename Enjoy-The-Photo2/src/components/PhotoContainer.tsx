import { useEffect, useState } from "react";
import { PhotoType } from "../context/Photos";
import { cc } from "../utils/cc";

import { FaInfo } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SlSizeFullscreen, SlSizeActual } from "react-icons/sl";
import { IoIosResize } from "react-icons/io";
import { IoOpen } from "react-icons/io5";
import usePhotos from "../hooks/usePhotos";

interface PhotoContainerProps {
  photo: PhotoType;
}

interface OrientationProps {
  cssClass: string;
  apiSize: "regular" | "small" | "full";
}

const PHOTO_ORIENTATION: OrientationProps[] = [
  { cssClass: "tall wide", apiSize: "regular" },
  { cssClass: "", apiSize: "small" },
  { cssClass: "", apiSize: "small" },
  { cssClass: "tall", apiSize: "regular" },
  { cssClass: "wide", apiSize: "regular" },
];

const PhotoContainer = ({ photo }: PhotoContainerProps) => {
  const { gallery, arrangeGallery } = usePhotos();
  const [isLiked, setIsLiked] = useState(false)
  ;
  const [photoSize, setPhotoSize] = useState(
    () =>
      PHOTO_ORIENTATION[Math.floor(Math.random() * PHOTO_ORIENTATION.length)]
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [areIconsActive, setAreIconsActive] = useState(false);
  // const {gallery, setGalery} = usePhotos()


  //handling  image interaction-----------------------------------------
  function handleMouseEnter() {
    if (isLoaded) {
      setAreIconsActive(true);
    }
  }

  function handleMouseLeave() {
    setAreIconsActive(false);
  }


  //Heart Icon------------------------------------------
  function handleHeartIcon() {
    arrangeGallery(photo);
  }

  useEffect(() => {
    gallery.find((p) => p.id === photo.id) ? setIsLiked(true) : setIsLiked(false)
  }, [gallery])
  

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cc(
        "img-container",
        "blur-load",
        photoSize.cssClass,
        isLoaded && "loaded"
      )}
      style={{ backgroundImage: `url(${photo.urls.thumb})` }}
    >
      <img
        className="img"
        src={photo.urls[photoSize.apiSize]}
        onLoad={() => setIsLoaded(true)}
      />
      {areIconsActive && (
        <div className="image-icons image-bottom-icons">
          {isLiked ? (
            <AiFillHeart onClick={handleHeartIcon} fill="red" />
          ) : (
            <AiOutlineHeart onClick={handleHeartIcon} fill="pink" />
          )}
          <FaInfo onClick={() => console.log("info")} fill="pink" />
          <IoOpen onClick={() => console.log("info")} fill="pink" />
        </div>
      )}
    </div>
  );
};

export default PhotoContainer;
