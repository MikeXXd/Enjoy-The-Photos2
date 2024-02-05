import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  MdDelete,
  MdDriveFileRenameOutline,
  MdOutlineFlipToBack,
} from "react-icons/md";
import setBackgroundImage from "../../services/setBackground";
import { cc } from "../../utils/cc";
import useGallery from "../gallery/store";
import useAppSetting from "../setting/store";
import useStories from "./store";
import UStoryPhoto from "../../interfacesAndTypes/UStoryPhoto";
import UStory from "../../interfacesAndTypes/UStory";

interface Props {
  story: UStory;
  photo: UStoryPhoto;
  isSettingRendered: boolean;
}

export default function UStoryOnePhoto({
  photo,
  isSettingRendered,
  story,
}: Props) {
  const { isInGallery, arrangeGallery } = useGallery();

  const { deletePhotoInUStory, changePhotoNameInUStory } = useStories();
  const { isSeenUStoryPhotoTitle } = useAppSetting();

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
            {isInGallery(photo) ? (
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
