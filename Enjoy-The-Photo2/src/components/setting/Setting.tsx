import useApp from "../../context/useApp";
import "./styles-setting.css";

interface SettingProps {
  onClose: (isOpen: boolean) => void;
}

const Setting = ({ onClose }: SettingProps) => {
  const {
    isDynamicBackground,
    setIsDynamicBackground,
    gridSize,
    setGridSize,
    resetApp,
    uStorySize,
    setUStorySize,
    uStoryPhotoTitle,
    setUStoryPhotoTitle,
  } = useApp();

  function handleReset() {
    const confirmed = window.confirm(
      "Are you sure you want to reset the application, delete Gallery and uStories?"
    );

    if (confirmed) {
      resetApp();
    }
  }

  return (
    <div
      className="modal-inside inside-container"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1587408811730-1a978e6c407d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM0MTl8MHwxfHNlYXJjaHw0fHxhaXJjcmFmdHxlbnwwfHx8fDE2OTc4MTA5NDV8MA&ixlib=rb-4.0.3&q=80&w=1080")',
      }}
    >
      <button onClick={() => onClose(false)} className="modal-btn-close">
        X
      </button>
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

      <div className="wrap-sizes">
        <div className="container-sizes">
          <h3>Grid Size</h3>
          <label className="container-radio">
            Small
            <input
              type="radio"
              onChange={() => setGridSize("small")}
              checked={gridSize === "small" && true}
              name="radio_grid"
            />
            <span className="checkmark-radio"></span>
          </label>
          <label className="container-radio">
            Medium
            <input
              type="radio"
              onChange={() => setGridSize("medium")}
              checked={gridSize === "medium" && true}
              name="radio_grid"
            />
            <span className="checkmark-radio"></span>
          </label>
          <label className="container-radio">
            Large
            <input
              type="radio"
              onChange={() => setGridSize("large")}
              checked={gridSize === "large" && true}
              name="radio_grid"
            />
            <span className="checkmark-radio"></span>
          </label>
        </div>
        {/* ------------------------------------------ */}
        <div className="container-sizes">
          <h3>uSTory Size</h3>
          <label className="container-radio">
            Small
            <input
              type="radio"
              onChange={() => setUStorySize("small")}
              checked={uStorySize === "small" && true}
              name="radio_uStory"
            />
            <span className="checkmark-radio"></span>
          </label>
          <label className="container-radio">
            Medium
            <input
              type="radio"
              onChange={() => setUStorySize("medium")}
              checked={uStorySize === "medium" && true}
              name="radio_uStory"
            />
            <span className="checkmark-radio"></span>
          </label>
          <label className="container-radio">
            Large
            <input
              type="radio"
              onChange={() => setUStorySize("large")}
              checked={uStorySize === "large" && true}
              name="radio_uStory"
            />
            <span className="checkmark-radio"></span>
          </label>
        </div>
      </div>
      {/* ------------------------------ */}
      <h3>uStories Photo Title</h3>
      <label className="switch">
        <input
          type="checkbox"
          onChange={() => setUStoryPhotoTitle(!uStoryPhotoTitle)}
          checked={uStoryPhotoTitle}
        />
        <span className="slider"></span>
      </label>

      <h3>Set Default, delete Gallery and uStories</h3>
      <button onClick={handleReset} className="setting-delete-btn">
        ! Reset
      </button>
    </div>
  );
};

export default Setting;
