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
import { CiPlay1 } from "react-icons/ci";
import UStoryOptionBtn from "./UStoryOptionBtn";
import useApp from "../context/useApp";
import { GiFlowerEmblem } from "react-icons/gi";

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
  const { gallery, arrangeGallery, query, isInGalery } = usePhotos();
  const {isUStoryCreating } = useApp();
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

  //--handling image interaction-----------------------------------------
  function handleMouseEnter() {
    if (isLoaded) {
      const photoDescription = photo.description + photo.alt_description;
      setUStoryWords(extractVerbsAndNouns(photoDescription) as string[]);
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
    setIsLiked(isInGalery(photo));
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
      <div
        className={cc(
          "img-icons img-top-icons",
          areIconsActive && !isUStoryIconSpread && "show"
        )}
      >
        <SlSizeFullscreen
          onClick={() => setIsPhotoModalOpen(true)}
          fill="pink"
        />
        {photoSize.cssClass === "tall wide" || (
          <IoIosResize onClick={handleResizePhoto} fill="pink" />
        )}
      </div>
      {/* ---uStory Icon and spread options---------------------------------------- */}
      <div
        className={cc("img-icons img-center-icon", areIconsActive && "show", isUStoryCreating && "ustory-on")}
      >
        {!isUStoryIconSpread && (
          <GiFlowerEmblem onClick={() => setIsUStoryIconSpread((s) => !s) } fill="pink" />
        )}
      </div>

      {isUStoryIconSpread && (
        <div className="u-story-options-container">
          {uStoryWords.map((word) => (
            <UStoryOptionBtn word={word} photo={photo} />
          ))}
          <UStoryOptionBtn word={query} photo={photo} />
        </div>
      )}

      {/* ----Bottom Icons ---------------------------------- */}
      <div
        className={cc(
          "img-icons img-bottom-icons",
          areIconsActive && !isUStoryIconSpread && "show"
        )}
      >
        {isLiked ? (
          <AiFillHeart onClick={handleHeartIcon} fill={"rgb(238, 93, 93)"} />
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



function extractVerbsAndNouns(text: string) {
  // extracting verbs and nouns from photo description to use then for further search in uStory
  if (!text) return;
  const doc = nlp(text);
  const verbs = doc.verbs().out("array");
  const nouns = doc.nouns().out("array");

  const nullCleaner = (array: string[]) =>
    array.map((word: string) =>
      word.startsWith("null") ? word.slice(4) : word
    );
  // some words are poluted with word "null" prefix nullCleaner removes it
  const cleanedVerbs = nullCleaner(verbs);
  const cleanedNouns = nullCleaner(nouns);

  // slicing sentences into single words and adding them to original 
  const sliceAndAdd = (originalArray: string[]) => {
    const allSingleWords = originalArray
      .map((item) => (item.includes(" ") ? item.split(" ") : item))
      .flat();
    const onlySentences = originalArray.filter((item) => item.includes(" ")).flat();
    return [...allSingleWords, ...onlySentences];
  };

  return [...sliceAndAdd(cleanedVerbs), ...sliceAndAdd(cleanedNouns)];
}
