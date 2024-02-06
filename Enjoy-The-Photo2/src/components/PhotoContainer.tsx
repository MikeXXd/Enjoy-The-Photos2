import nlp from "compromise";
import { useEffect, useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { FaInfo } from "react-icons/fa";
import { GiFlowerEmblem } from "react-icons/gi";
import { IoIosResize } from "react-icons/io";
import { IoOpen } from "react-icons/io5";
import { MdOutlineFlipToBack } from "react-icons/md";
import { SlSizeFullscreen } from "react-icons/sl";
import usePhotos from "../context/usePhotos";
import Photo from "../interfacesAndTypes/Photo";
import setBackgroundImage from "../services/setBackground";
import { cc } from "../utils/cc";
import IconHeart from "./IconHeart";
import Modal from "./Modal";
import UStoryOptionBtn from "./UStoryOptionBtn";
import useStories from "./uStory/store";

interface PhotoContainerProps {
  photo: Photo;
}

interface PhotoSizesProps {
  cssClass: string;
  apiSize: "regular" | "small" | "full";
}

// -- adding or removing similar objects to this array will influence the randomization of PhotoContainer size
const PHOTO_SIZES: PhotoSizesProps[] = [
  { cssClass: "tall wide", apiSize: "regular" }, // this array[0] is PRIVATE, DO NOT CHANGE NOR REMOVE!!!
  { cssClass: "", apiSize: "small" },
  { cssClass: "", apiSize: "small" },
  { cssClass: "tall", apiSize: "regular" },
  { cssClass: "wide", apiSize: "regular" },
];

const PhotoContainer = ({ photo }: PhotoContainerProps) => {
  const { query } = usePhotos();
  const { isUStoryCreating } = useStories();

  const [isInfoActive, setIsInfoActive] = useState(false);
  const [photoSize, setPhotoSize] = useState(
    () => PHOTO_SIZES[Math.floor(Math.random() * PHOTO_SIZES.length)]
  );
  const [isResizing, setIsResizing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [areIconsActive, setAreIconsActive] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [uStoryWords, setUStoryWords] = useState<string[]>([]);
  const [isUStoryIconSpread, setIsUStoryIconSpread] = useState(false);
  const [isPhotoInvisible, setIsPhotoInvisible] = useState(false);

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
    setPhotoSize(PHOTO_SIZES[0]);
    setIsResizing(true);
    handleMouseLeave(); //serving the purpose of hiding icons
  }

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
      style={
        !isPhotoInvisible
          ? { backgroundImage: `url(${photo.urls.thumb})` }
          : { border: "none" }
      }
    >
      {!isPhotoInvisible && (
        <img
          className={cc("img", isResizing && "img-resize-here")}
          src={photo.urls[photoSize.apiSize]}
          onLoad={() => setIsLoaded(true)}
        />
      )}

      {/* ----Top left Icons ---------------------------------- */}

      <div
        className={cc(
          "img-icons img-top-left-icons",
          areIconsActive &&
            !isUStoryIconSpread &&
            !isPhotoInvisible &&
            !isInfoActive &&
            "show"
        )}
      >
        <SlSizeFullscreen
          onClick={() => setIsPhotoModalOpen(true)}
          fill="pink"
          title="Show full size"
        />
        {photoSize.cssClass === "tall wide" || (
          <IoIosResize
            onClick={handleResizePhoto}
            fill="pink"
            title="Size up"
          />
        )}
      </div>
      {/* ----Top right Icons ---------------------------------- */}
      <div
        className={cc(
          "img-icons img-top-right-icons",
          areIconsActive && !isUStoryIconSpread && "show"
        )}
      >
        <AiOutlineEyeInvisible
          onClick={() => setIsPhotoInvisible((s) => !s)}
          fill="pink"
          title="invisible photo"
        />
        {!isPhotoInvisible && (
          <MdOutlineFlipToBack
            onClick={() => setBackgroundImage(photo)}
            fill="pink"
            title="Set photo to background"
          />
        )}
      </div>
      {/* ---uStory Icon and spread options---------------------------------------- */}
      <div
        className={cc(
          "img-icons img-center-icon",
          areIconsActive && !isPhotoInvisible && !isInfoActive && "show",
          isUStoryCreating && "ustory-on"
        )}
      >
        {!isUStoryIconSpread && (
          <GiFlowerEmblem
            onClick={() => setIsUStoryIconSpread((s) => !s)}
            fill="pink"
            title={
              isUStoryCreating
                ? "Continue in uStory creation"
                : "Start uStory creation"
            }
          />
        )}
      </div>

      {isUStoryIconSpread && !isPhotoInvisible && (
        <div className="u-story-options-container">
          {uStoryWords.map((word, i) => (
            <UStoryOptionBtn key={i} word={word} photo={photo} />
          ))}
          <UStoryOptionBtn word={query} photo={photo} />
        </div>
      )}

      {/* ----Bottom Icons ---------------------------------- */}
      <div
        className={cc(
          "img-icons img-bottom-icons",
          areIconsActive && !isUStoryIconSpread && !isPhotoInvisible && "show"
        )}
      >
        <IconHeart photo={photo} />
        <FaInfo
          onClick={() => setIsInfoActive(!isInfoActive)}
          fill="pink"
          title="Show info"
        />
        <IoOpen
          onClick={() => window.open(photo.urls.full)}
          fill="pink"
          title="Open photo in new window"
        />
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
          src={photo.urls.regular}
          style={{ backgroundImage: `url(${photo.urls.thumb})` }}
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
  // some words are poluted with "null" prefix nullCleaner removes it
  const cleanedVerbs = nullCleaner(verbs);
  const cleanedNouns = nullCleaner(nouns);

  // slicing sentences into single words and adding them to original
  const sliceAndAdd = (originalArray: string[]) => {
    const allSingleWords = originalArray
      .map((item) => (item.includes(" ") ? item.split(" ") : item))
      .flat();
    const onlySentences = originalArray
      .filter((item) => item.includes(" "))
      .flat();
    return [...allSingleWords, ...onlySentences];
  };

  return [...sliceAndAdd(cleanedVerbs), ...sliceAndAdd(cleanedNouns)];
}
