import "./styles.css";
import PhotosGrid from "./components/PhotosGrid";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import usePhotos from "./hooks/usePhotos";
import imgTriangle from "./img/icons8-triangle-color-96.png";
import { useEffect, useState } from "react";

export interface BackgroundProps {
  background: string | null;
  setBackground: () => void;
}

const App = () => {
  const { actualPhotos, error } = usePhotos();
  // const [background, setBackground] = useState<string>("https://images.unsplash.com/photo-1490730141103-6cac27aaab94?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MTM0MTl8MHwxfHNlYXJjaHwzM3x8bmF0dXJlfGVufDB8fHx8MTY5ODY4NzM1Nnww&ixlib=rb-4.0.3&q=85")

  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    if (actualPhotos.length === 0) return;
    
    const fetchBackgroundImage = async () => {
      let currentBackground = document.getElementById("root") as HTMLElement;
      const response = await fetch(actualPhotos[1].urls.regular);
      const blob = await response.blob();
      currentBackground.style.backgroundImage = `url(${URL.createObjectURL(blob)})`
    };
    fetchBackgroundImage()
    ;
  }, [actualPhotos]);

  return (
    <div className="main-container">
      <div className="header-and-nav-bar">
        <span className="pre-header hide-on-small-device">
          Breath in the depth of colors and geometry, jump in and enjoooooy!
        </span>
        <header className="header">
          <img src={imgTriangle} />
          <h1>Enjoy the Photos2</h1>
        </header>
        <NavBar />
      </div>
      <SearchBar />
      {error && <div className="error">{error}</div>}
      <PhotosGrid photos={actualPhotos} />
      <footer className="footer">
        <span>
          Created by
          <a href="https://www.linkedin.com/in/michal-vili%C5%A1-483196251/">
            MikeXd
          </a>
          2023
        </span>
      </footer>
    </div>
  );
};

export default App;
