import { UStoryChain, UStoryType } from "../../App";
import { cc } from "../../utils/cc";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  MdOutlineFlipToBack,
  MdDriveFileRenameOutline,
  MdDelete,
} from "react-icons/md";
import usePhotos from "../../context/usePhotos";
import { fetchBackgroundImage } from "../../services/extFunctions";
import useApp from "../../context/useApp";

interface Props {
  story: UStoryType;
  photo: UStoryChain;
  showPhotoTitle: boolean;
  isSettingRendered: boolean;
}

export default function UStoryOnePhoto({
  photo,
  showPhotoTitle,
  isSettingRendered,
  story,
}: Props) {
  const { isInGalery, arrangeGallery } = usePhotos();
  const { changeUStoryPhotoTitle, deleteUStoryPhoto } = useApp();

  function handleHeartIcon() {
    arrangeGallery(photo);
  }

  function handleSetBackground() {
    fetchBackgroundImage(photo);
  }

  function handleRenamePhoto() {
    const newTitle = prompt("Enter new title");
    if (newTitle) {
      changeUStoryPhotoTitle({
        storyId: story.id,
        photoId: photo.id,
        name: newTitle,
      });
    }
  }

  function handleDeletePhoto() {
    if (window.confirm("Do you really want to DELETE ! this photo?"))
      deleteUStoryPhoto({storyId: story.id,
        photoId: photo.id});
    }

  return (
    <div
      className={cc(
        "ustory-photo-container",
        !isSettingRendered && "show-on-hover",
        showPhotoTitle && "show-title",
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
              />
            ) : (
              <AiOutlineHeart
                onClick={handleHeartIcon}
                fill={"rgb(238, 93, 93)"}
              />
            )}
            <MdOutlineFlipToBack
              onClick={handleSetBackground}
              fill={"rgb(209, 202, 179)"}
            />
            <MdDriveFileRenameOutline
              onClick={handleRenamePhoto}
              fill={"rgb(227, 208, 80)"}
            />
          </div>
          <MdDelete className="delete-icon"  onClick={handleDeletePhoto} 
          />
        </div>
      )}
      <img
        className="ustory-img "
        src={photo.urls.small}
        alt={photo.alt_description}
      />
    </div>
  );
}
