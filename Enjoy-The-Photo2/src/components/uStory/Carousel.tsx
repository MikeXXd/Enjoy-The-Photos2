import Flickity from "react-flickity-component";
import { UStoryType } from "../../App";
import "./flickity.css";
import useApp from "../../context/useApp";
import { useEffect, useState } from "react";
import UStoryOnePhoto from "./UStoryOnePhoto";
import { cc } from "../../utils/cc";

interface Props {
  story: UStoryType;
}

export default function Carousel({ story }: Props) {
  const { changeUStoryTitle, deleteUStory, unblockAllUStorySettings,isAllUStorySettingClosed } = useApp();
  const [showPhotoTitle, setShowPhotoTitle] = useState(false); //need to be connected with Setting component - doing later
  const [defaultShowPhotoTitle, setDefaultShowPhotoTitle] = useState(false)
  const [isSettingRendered, setIsSettingRendered] = useState(false)

  const flickityOptions = {
    initialIndex: 1,
    autoPlay: true,
    prevNextButtons: false,
    accessibility: true,
    cellAlign: "center",
    contain: true,
    percentPosition: false,
    pageDots: true,
    fullscreen: true,
    setGallerySize: true,
  }; // bound to flickity.css

  useEffect(() => {
    if (isAllUStorySettingClosed) {
      setIsSettingRendered(false)
      setShowPhotoTitle(defaultShowPhotoTitle)
    }
  }, [isAllUStorySettingClosed])

  function handleStoryTitle() {
    const newTitle = prompt("Enter new title");
    if (newTitle) {
      changeUStoryTitle({ id: story.id, name: newTitle });
    }
  }

  function handleStorydelete() {
    if (window.confirm("Do you really want to DELETE ! this uStory?"))
      deleteUStory({ id: story.id });
  }

  function handleStorySetting() {
    unblockAllUStorySettings()
    !isSettingRendered && setDefaultShowPhotoTitle(showPhotoTitle)
    setIsSettingRendered(s => !s)
    !isSettingRendered ? setShowPhotoTitle(true) : setShowPhotoTitle(defaultShowPhotoTitle)
  }

  if (story.body.length < 4) {
    flickityOptions.autoPlay = false;
  }

  return (
    <>
    {/* regarding elements .ustory-delete-btn and .ustory-setting-btn : changing text might debalanc their positions*/}
      <div
        className="ustory-btn ustory-delete-btn"
        onClick={() => handleStorydelete()}
      >
        X
      </div>
    
      <div
        className="ustory-btn ustory-setting-btn"
        onClick={() => handleStorySetting()}
      >
        Setting
      </div>
      <div
        className={cc("ustory-btn", "ustory-title-btn", isSettingRendered && "move-away")}
        onClick={() => handleStoryTitle()}
      >
        {story.name}
      </div>

      <Flickity
        className="carousel"
        elementType="div" 
        options={flickityOptions}
        disableImagesLoaded={false}
      >
        {story.body.map((photo) => (
          <UStoryOnePhoto
            key={photo.id}
            story={story}
            photo={photo}
            showPhotoTitle={showPhotoTitle}
            isSettingRendered={isSettingRendered}
          />
        ))}
      </Flickity>
    </>
  );
}
