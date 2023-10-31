import { useState } from "react";
import usePhotos from "../hooks/usePhotos";

interface SettingProps {
    onClose: (isOpen: boolean) => void;
  }

const Setting = ({ onClose}: SettingProps) => {
  const [background, setBackground] = useState<string>("https://source.unsplash.com/eOpewngf68w")
   const {actualPhotos} = usePhotos();


    return (
        <div
        className="modal-inside inside-container"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1587408811730-1a978e6c407d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MTM0MTl8MHwxfHNlYXJjaHw0fHxhaXJjcmFmdHxlbnwwfHx8fDE2OTc4MTA5NDV8MA&ixlib=rb-4.0.3&q=80&w=1080")',
          }}
        >
          <div>
            <button onClick={() => onClose(false)} className="modal-btn-close" >
              X
            </button>
            <h1>Setting</h1>
          </div>
          <h2 className="about-text">
            Here u can set your preferences.
          </h2>

          <button onClick={() => setBackground(actualPhotos[1].urls.full)} className="btn btn-primary">Dynamic background</button>
        </div>
    )
}

export default Setting