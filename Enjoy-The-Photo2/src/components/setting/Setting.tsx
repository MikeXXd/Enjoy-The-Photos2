import { useNavigate } from "react-router-dom";
import {
  DYNAMIC_BACKGROUND,
  GRID_SIZE,
  STICKY_SEARCH_BAR,
  USTORY_PHOTO_TITLE,
  USTORY_SIZE,
} from "../../data/defaultConst";
import useGallery from "../gallery/store";
import useStories from "../uStory/store";
import useAppSetting from "./store";
import "./styles-setting.css";
import { GridSize, UStorySize } from "../../interfacesAndTypes/Sizes";

const GRID_SIZE_ARRAY: GridSize[] = ["small", "medium", "large"];
const USTORY_SIZE_ARRAY: UStorySize[] = ["small", "medium", "large"];

// -----SETTING---------------------------------------------------------
const Setting = () => {
  const navigate = useNavigate();
  const { setDefaultGallery } = useGallery();
  const { setDefaultUStories } = useStories();
  const {
    isSearchBarSticky,
    setIsSearchBarSticky,
    isDynamicBackground,
    setIsDynamicBackground,
    isSeenUStoryPhotoTitle,
    setIsSeenUStoryPhotoTitle,
    gridSize,
    setGridSize,
    uStorySize,
    setUStorySize,
  } = useAppSetting();

  function handleReset() {
    const confirmed = window.confirm(
      "Are you sure you want to reset the application, delete Gallery and uStories?"
    );
    if (confirmed) {
      setDefaultGallery();
      setDefaultUStories();
      setIsDynamicBackground(DYNAMIC_BACKGROUND.DEFAULT_VALUE);
      setGridSize(GRID_SIZE.DEFAULT_VALUE);
      setUStorySize(USTORY_SIZE.DEFAULT_VALUE);
      setIsSearchBarSticky(STICKY_SEARCH_BAR.DEFAULT_VALUE);
      setIsSeenUStoryPhotoTitle(USTORY_PHOTO_TITLE.DEFAULT_VALUE);
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="about-and-setting">
      <h1>Setting</h1>

      <h3>Dynamic Background</h3>
      <label className="switch">
        <input
          type="checkbox"
          onChange={() => setIsDynamicBackground(!isDynamicBackground)}
          checked={isDynamicBackground}
        />
        <span className="slider"></span>
      </label>

      <h3>Sticky Search bar </h3>
      <label className="switch">
        <input
          type="checkbox"
          onChange={() => setIsSearchBarSticky(!isSearchBarSticky)}
          checked={isSearchBarSticky}
        />
        <span className="slider"></span>
      </label>
      {/* ------------------------------ */}
      <div className="wrap-sizes">
        <div className="container-sizes">
          <h3>Grid Size</h3>
          {GRID_SIZE_ARRAY.map((i) => (
            <label key={i} className="container-radio">
              {toFirstLetterUpperCase(i)}
              <input
                type="radio"
                onChange={() => setGridSize(i)}
                checked={gridSize === i && true}
                name="radio_grid"
              />
              <span className="checkmark-radio"></span>
            </label>
          ))}
        </div>
        {/* ------------------------------------------ */}
        <div className="container-sizes">
          <h3>uSTory Size</h3>
          {USTORY_SIZE_ARRAY.map((i) => (
            <label key={i} className="container-radio">
              {toFirstLetterUpperCase(i)}
              <input
                type="radio"
                onChange={() => setUStorySize(i)}
                checked={uStorySize === i && true}
                name="radio_uStory"
              />
              <span className="checkmark-radio"></span>
            </label>
          ))}
        </div>
      </div>
      {/* ------------------------------ */}
      <h3>uStories Photo Title</h3>
      <label className="switch">
        <input
          type="checkbox"
          onChange={() => setIsSeenUStoryPhotoTitle(!isSeenUStoryPhotoTitle)}
          checked={isSeenUStoryPhotoTitle}
        />
        <span className="slider"></span>
      </label>
      {/* ------------------------------ */}
      <h3>Set Default, delete Gallery and uStories</h3>
      <button onClick={handleReset} className="setting-delete-btn">
        ! Reset
      </button>
    </div>
  );
};

export default Setting;

// ---------------------helping functions-----------------------------------
function toFirstLetterUpperCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
