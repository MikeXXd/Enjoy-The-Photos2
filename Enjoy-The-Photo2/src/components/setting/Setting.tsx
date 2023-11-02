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
  } = useApp();

  function handleReset() {
    alert("Are you sure you want to reset the application and delete Gallery?");
    resetApp();
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

      <div className="container-grid-size">
        <h3>Grid Size</h3>
        <label className="container-radio">
          Small
          <input
            type="radio"
            onChange={() => setGridSize("small")}
            checked={gridSize === "small" && true}
            name="radio"
          />
          <span className="checkmark-radio"></span>
        </label>
        <label className="container-radio">
          Medium
          <input
            type="radio"
            onChange={() => setGridSize("medium")}
            checked={gridSize === "medium" && true}
            name="radio"
          />
          <span className="checkmark-radio"></span>
        </label>
        <label className="container-radio">
          Large
          <input
            type="radio"
            onChange={() => setGridSize("large")}
            checked={gridSize === "large" && true}
            name="radio"
          />
          <span className="checkmark-radio"></span>
        </label>
      </div>

      <h3>Set Default and Delete Gallery</h3>
      <button onClick={handleReset} className="setting-delete-btn">
        ! Reset
      </button>
    </div>
  );
};

export default Setting;
