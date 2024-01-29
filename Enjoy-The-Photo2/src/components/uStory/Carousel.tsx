import { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import { MdDelete, MdDriveFileRenameOutline } from "react-icons/md";
import useApp from "../../context/useApp";
import { cc } from "../../utils/cc";
import UStoryOnePhoto from "./UStoryOnePhoto";
import "./flickity.css";
import useStories, { UStoryType } from "./store";
import useAppSetting from "../setting/store";

interface Props {
  story: UStoryType;
}

export default function Carousel({ story }: Props) {
  const {
    unblockAllUStorySettings,
    isAllUStorySettingClosed,
  } = useApp();
  const { deleteUStory, changeUStoryName } = useStories()
  const { uStorySize } = useAppSetting()

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
      changeUStoryName({ id: story.id, name: newTitle });
    }
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
        onClick={handleStorySetting}
        title="uStory settimg"
      >
        {
          <div>
            {story.name}
            {isSettingRendered && (
              <MdDriveFileRenameOutline
                onClick={handleStoryTitle}
                className="rename-whole-ustory-icon"
                title="Rename uStory"
              />
            )}
          </div>
        }
        {isSettingRendered && (
          <MdDelete
            className="delete-whole-story-icon"
            onClick={() => deleteUStory({ id: story.id })}
            title="Delete uStory"
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
