import { GridSize, UStorySize } from "../../App";
import useApp from "../../context/useApp";
import "./styles-setting.css";

interface SettingProps {
  onClose: (isOpen: boolean) => void;
}

const GRID_SIZE_ARRAY: GridSize[] = ["small", "medium", "large"];
const USTORY_SIZE_ARRAY: UStorySize[] = ["small", "medium", "large"];

const Setting = ({ onClose }: SettingProps) => {
  const {
    isDynamicBackground,
    setIsDynamicBackground,
    gridSize,
    setGridSize,
    resetApp,
    uStorySize,
    setUStorySize,
    isSeenUStoryPhotoTitle,
    setIsSeenUStoryPhotoTitle,
  } = useApp();

  function handleReset() {
    const confirmed = window.confirm(
      "Are you sure you want to reset the application, delete Gallery and uStories?"
    );
    if (confirmed) {
      resetApp();
    }
  }
  function toFirstLetterUpperCase(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div
      className="modal-inside inside-container"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1587408811730-1a978e6c407d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM0MTl8MHwxfHNlYXJjaHw0fHxhaXJjcmFmdHxlbnwwfHx8fDE2OTc4MTA5NDV8MA&ixlib=rb-4.0.3&q=80&w=1080")',
      }}
    >
      <div>
        <button onClick={() => onClose(false)} className="modal-btn-close">
          X
        </button>
      </div>
      <h1>Setting</h1>
      <div className="modal-text-container">
        <h3>Dynamic Background</h3>
        <label className="switch">
          <input
            type="checkbox"
            onChange={() => setIsDynamicBackground(!isDynamicBackground)}
            checked={isDynamicBackground}
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
    </div>
  );
};

export default Setting;
