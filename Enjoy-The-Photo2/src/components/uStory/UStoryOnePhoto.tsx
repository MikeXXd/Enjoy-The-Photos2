import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  MdDelete,
  MdDriveFileRenameOutline,
  MdOutlineFlipToBack,
} from "react-icons/md";
import useApp from "../../context/useApp";
import usePhotos from "../../context/usePhotos";
import setBackgroundImage from "../../services/extFunctions";
import { cc } from "../../utils/cc";
import useStories, { UStoryChain, UStoryType } from "./store";

interface Props {
  story: UStoryType;
  photo: UStoryChain;
  isSettingRendered: boolean;
}

export default function UStoryOnePhoto({
  photo,
  isSettingRendered,
  story,
}: Props) {
  const { isInGalery, arrangeGallery } = usePhotos();
  const { isSeenUStoryPhotoTitle } =
    useApp();

    const { deletePhotoInUStory, changePhotoNameInUStory } = useStories()

  function handleHeartIcon() {
    arrangeGallery(photo);
  }

  function handleSetBackground() {
    setBackgroundImage(photo);
  }

  function handleRenamePhoto() {
    const newTitle = prompt("Enter new title");
    if (newTitle) {
      changePhotoNameInUStory({
        storyId: story.id,
        photoId: photo.id,
        name: newTitle,
      });
    }
  }

  function handleDeletePhoto() {
    deletePhotoInUStory({ storyId: story.id, photoId: photo.id });
  }

  return (
    <div
      className={cc(
        "ustory-photo-container",
        !isSettingRendered && "show-on-hover",
        (isSeenUStoryPhotoTitle || isSettingRendered) && "show-title",
        isSettingRendered && "on-setting"
      )}
      data-img={photo.photoInStoryName}
    >
      {isSettingRendered && (
        <div className="story-photo-icons-wrap">
          <div>
            {isInGalery(photo) ? (
              <AiFillHeart
                onClick={handleHeartIcon}
                fill={"rgb(238, 93, 93)"}
                title="In Gallery"
              />
            ) : (
              <AiOutlineHeart
                onClick={handleHeartIcon}
                fill={"rgb(238, 93, 93)"}
                title="Save to Gallery"
              />
            )}
            <MdOutlineFlipToBack
              onClick={handleSetBackground}
              fill={"rgb(209, 202, 179)"}
              title="Set photo to background"
            />
            <MdDriveFileRenameOutline
              onClick={handleRenamePhoto}
              fill={"rgb(227, 208, 80)"}
              title="Rename photo"
            />
          </div>
          <MdDelete
            className="delete-icon"
            onClick={handleDeletePhoto}
            title="Delete photo"
          />
        </div>
      )}
      <img
        className="ustory-img "
        src={photo.urls.raw + "&h=480&dpr=2"}
        alt={photo.alt_description}
      />
    </div>
  );
}
