import useApp from "../context/useApp";

interface SettingProps {
  onClose: (isOpen: boolean) => void;
}

const Setting = ({ onClose }: SettingProps) => {

  const { isDynamicBackground, setIsDynamicBackground } = useApp()

  return (
    <div
      className="modal-inside inside-container"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1587408811730-1a978e6c407d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM0MTl8MHwxfHNlYXJjaHw0fHxhaXJjcmFmdHxlbnwwfHx8fDE2OTc4MTA5NDV8MA&ixlib=rb-4.0.3&q=80&w=1080")'
      }}
    >
      <div>
        <button onClick={() => onClose(false)} className="modal-btn-close">
          X
        </button>
        <h1>Setting</h1>
      </div>
      <h2 className="about-text">Here u can set your preferences.</h2>

      <div className="setting-area">
        <button
          onClick={() => setIsDynamicBackground(!isDynamicBackground)}
          className="btn btn-primary"
        >
          { isDynamicBackground ? 'Dynamic background is on' : 'Dynamic background is off'}
        </button>
          <div>
            <label htmlFor="grid-size">Grid size</label>
          <select id="grid-size" defaultValue='medium'>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          </div>
        <button className="btn btn-primary">Delete Gallery</button>
      </div>
    </div>
  );
};

export default Setting;

