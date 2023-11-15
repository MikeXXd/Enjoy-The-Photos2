import { useEffect, useState } from "react";
import { PhotoType } from "../context/Photos";
import { cc } from "../utils/cc";
import Modal from "./Modal";
import { FaInfo } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SlSizeFullscreen } from "react-icons/sl";
import { IoIosResize } from "react-icons/io";
import { IoOpen } from "react-icons/io5";
import usePhotos from "../context/usePhotos";
import nlp from "compromise";
import { MdChangeHistory } from "react-icons/md";

interface PhotoContainerProps {
  photo: PhotoType;
}

interface OrientationProps {
  cssClass: string;
  apiSize: "regular" | "small" | "full";
}

// -- adding or removing similar objects to this array will influence the randomization of PhotoContainer size
const PHOTO_ORIENTATION: OrientationProps[] = [
  { cssClass: "tall wide", apiSize: "regular" }, // this array[0] is PRIVATE, DO NOT CHANGE NOR REMOVE!!!
  { cssClass: "", apiSize: "small" },
  { cssClass: "", apiSize: "small" },
  { cssClass: "tall", apiSize: "regular" },
  { cssClass: "wide", apiSize: "regular" },
];

const PhotoContainer = ({ photo }: PhotoContainerProps) => {
  const { gallery, arrangeGallery } = usePhotos();
  const [isLiked, setIsLiked] = useState(false);
  const [isInfoActive, setIsInfoActive] = useState(false);
  const [photoSize, setPhotoSize] = useState(
    () =>
      PHOTO_ORIENTATION[Math.floor(Math.random() * PHOTO_ORIENTATION.length)]
  );
  const [isResizing, setIsResizing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [areIconsActive, setAreIconsActive] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [uStoryWords, setUStoryWords] = useState<string[]>([]);
  const [isUStoryIconSpread, setIsUStoryIconSpread] = useState(false);

  // console.log("uStory", uStoryWords);

  const photoDescription = (photo.description + photo.alt_description).replace(
    /\./g,
    ""
  ); //removing dots from description

  function extractVerbsAndNouns(text: string) {
    // extracting verbs and nouns from photo description to use then for further search in uStory
    if (text.length < 1) return;
    const doc = nlp(text);
    const verbs = doc.verbs().out("array");
    const nouns = doc.nouns().out("array");
    setUStoryWords([...verbs, ...nouns]);
  }

  useEffect(() => {
    extractVerbsAndNouns(photoDescription);
  }, []);

  //--handling image interaction-----------------------------------------
  function handleMouseEnter() {
    if (isLoaded) {
      setAreIconsActive(true);
      setIsResizing(false);
    }
  }

  function handleMouseLeave() {
    setAreIconsActive(false);
    setIsInfoActive(false);
    setIsUStoryIconSpread(false);
  }

  //--Resize Icon------------------------------------------
  function handleResizePhoto() {
    setPhotoSize(PHOTO_ORIENTATION[0]);
    setIsResizing(true);
    handleMouseLeave(); //serving the purpose of hiding icons
  }

  //--Heart Icon------------------------------------------
  function handleHeartIcon() {
    arrangeGallery(photo);
  }

  //--Galerry Icon------------------------------------------
  useEffect(() => {
    gallery.find((p) => p.id === photo.id)
      ? setIsLiked(true)
      : setIsLiked(false);
  }, [gallery]);

  // this hook doest work properly - problem with reappearing icons
  useEffect(() => {
    handleMouseLeave();
  }, [isPhotoModalOpen]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cc(
        "img-container blur-load",
        photoSize.cssClass,
        isLoaded && "loaded"
      )}
      style={{ backgroundImage: `url(${photo.urls.thumb})` }}
    >
      <img
        className={cc("img", isResizing && "img-resize-here")}
        src={photo.urls[photoSize.apiSize]}
        onLoad={() => setIsLoaded(true)}
      />
      {/* ----Top Icons ---------------------------------- */}
      <div className={cc("img-icons img-top-icons", areIconsActive && "show")}>
        <SlSizeFullscreen
          onClick={() => setIsPhotoModalOpen(true)}
          fill="pink"
        />
        {photoSize.cssClass === "tall wide" || (
          <IoIosResize onClick={handleResizePhoto} fill="pink" />
        )}
      </div>
      {/* ---uStory Icon---------------------------------------- */}
      <div
        className={cc("img-icons img-center-icon", areIconsActive && "show")}
      >
        {!isUStoryIconSpread ? <MdChangeHistory onClick={() => setIsUStoryIconSpread(s => !s)} /> :
        <ul>
          {uStoryWords.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>}
      </div>

      {/* ----Bottom Icons ---------------------------------- */}
      <div
        className={cc("img-icons img-bottom-icons", areIconsActive && "show")}
      >
        {isLiked ? (
          <AiFillHeart onClick={handleHeartIcon} fill="red" />
        ) : (
          <AiOutlineHeart onClick={handleHeartIcon} fill="pink" />
        )}
        <FaInfo onClick={() => setIsInfoActive(true)} fill="pink" />
        <IoOpen onClick={() => window.open(photo.urls.full)} fill="pink" />
      </div>

      {/* ---Photo MODAL ------------------------------------ */}
      <Modal
        isOpen={isPhotoModalOpen}
        onClose={() => {
          setIsPhotoModalOpen(false);
        }}
      >
        <img
          className="modal-inside inside-img"
          src={photo.urls.full}
          style={{ backgroundImage: `url(${photo?.urls.small})` }}
          onClick={() => {
            setIsPhotoModalOpen(false);
          }}
        />
      </Modal>

      {/* ---Photo description ------------------------------------ */}
      <div className={cc("img-info", isInfoActive && "show")}>
        {photo.description ? photo.description : photo.alt_description}
      </div>
    </div>
  );
};

export default PhotoContainer;
