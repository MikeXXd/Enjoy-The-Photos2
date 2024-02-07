import { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import { MdDelete, MdDriveFileRenameOutline } from "react-icons/md";
import UStory from "../../interfacesAndTypes/UStory";
import { cc } from "../../utils/cc";
import Modal from "../Modal";
import useAppSetting from "../setting/store";
import ModalFormTitleChange from "./ModalFormTitleChange";
import UStoryOnePhoto from "./UStoryOnePhoto";
import "./flickity.css";
import useStories from "./store";

interface Props {
  story: UStory;
  closingTrigger: number;
}

export default function Carousel({ story, closingTrigger }: Props) {
  const { deleteUStory, changeUStoryName, setIsUStoryCreating } = useStories();
  const { uStorySize } = useAppSetting();

  const [isSettingRendered, setIsSettingRendered] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);

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
    setIsSettingRendered(false);
  }, [closingTrigger]);

  function handleStorySetting() {
    setIsUStoryCreating(false);
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
                onClick={() => setIsModalOpened(true)}
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
      <Modal
        isOpen={isModalOpened}
        onClose={() => {
          setIsModalOpened(false);
        }}
      >
        <ModalFormTitleChange
          currentTitle={story.name}
          onClose={() => setIsModalOpened(false)}
          saveNewTitle={(newTitle) =>
            changeUStoryName({ id: story.id, name: newTitle })
          }
        />
      </Modal>
    </>
  );
}
