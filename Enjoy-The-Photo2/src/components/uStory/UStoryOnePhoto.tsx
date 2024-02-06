import {
  MdDelete,
  MdDriveFileRenameOutline,
  MdOutlineFlipToBack,
} from "react-icons/md";
import UStory from "../../interfacesAndTypes/UStory";
import UStoryPhoto from "../../interfacesAndTypes/UStoryPhoto";
import setBackgroundImage from "../../services/setBackground";
import { cc } from "../../utils/cc";
import IconHeart from "../IconHeart";
import useAppSetting from "../setting/store";
import useStories from "./store";

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

  const { deletePhotoInUStory, changePhotoNameInUStory } = useStories();
  const { isSeenUStoryPhotoTitle } = useAppSetting();

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
            <IconHeart photo={photo}/>
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
