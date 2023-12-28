import Flickity from "react-flickity-component";
import { UStoryType } from "../../App";
import "./flickity.css";
import useApp from "../../context/useApp";
import { useEffect, useState } from "react";
import UStoryOnePhoto from "./UStoryOnePhoto";
import { cc } from "../../utils/cc";
import { MdDelete, MdDriveFileRenameOutline } from "react-icons/md";

interface Props {
  story: UStoryType;
}

export default function Carousel({ story }: Props) {
  const {
    changeUStoryTitle,
    deleteUStory,
    unblockAllUStorySettings,
    isAllUStorySettingClosed,
    uStorySize,
  } = useApp();
  const [isSettingRendered, setIsSettingRendered] = useState(false);

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
      setIsSettingRendered(false);
    }
  }, [isAllUStorySettingClosed]);

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
    unblockAllUStorySettings();
    setIsSettingRendered((s) => !s);
  }

  if (story.body.length < 4) {
    flickityOptions.autoPlay = false;
  }

  return (
    <>
      <div
        className={cc(
          "ustory-btn",
          isSettingRendered && "show-ustory-setting-options"
        )}
        onClick={() => handleStorySetting()}
      >
        {
          <div>
            {story.name}
            {isSettingRendered && (
              <MdDriveFileRenameOutline
                onClick={handleStoryTitle}
                className="rename-whole-ustory-icon"
              />
            )}
          </div>
        }
        {isSettingRendered && (
          <MdDelete
            className="delete-whole-story-icon"
            onClick={() => handleStorydelete()}
          />
        )}
      </div>

      <Flickity
        className={cc("carousel", uStorySize)}
        elementType="div"
        options={flickityOptions}
        disableImagesLoaded={false}
      >
        {story.body.map((photo) => (
          <UStoryOnePhoto
            key={photo.id}
            story={story}
            photo={photo}
            isSettingRendered={isSettingRendered}
          />
        ))}
      </Flickity>
    </>
  );
}
