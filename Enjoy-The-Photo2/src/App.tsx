import "./styles.css";
import PhotosGrid from "./components/PhotosGrid";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import usePhotos from "./context/usePhotos";
import imgTriangle from "./img/icons8-triangle-color-96.png";
import { createContext, useEffect, useState } from "react";
import { fetchBackgroundImage } from "./services/extFunctions";

interface AppContextProps {
  isDynamicBackground: boolean;
  setIsDynamicBackground: (active: boolean) => void;
  gridSize: GridSize;
  setGridSize: (size: GridSize) => void;
  resetApp: () => void;
}

export const AppContext = createContext<AppContextProps | null>(null);

type GridSize = "small" | "medium" | "large"

interface StorageSettingProps {
  dynamic_background: boolean;
  grig_size: GridSize;
}

// -----APP---------------------------------------------------------
const App = () => {
  const { actualPhotos, error, clearGallery } = usePhotos();
  const [isDynamicBackground, setIsDynamicBackground] = useState(() => {
    const setting: string | null = localStorage.getItem("ETP-seting");
    if (setting == null) return false;
    const parsedObject: StorageSettingProps = JSON.parse(setting);
    return parsedObject.dynamic_background;
  });

  const [gridSize, setGridSize] = useState<GridSize>(() => {
    const setting: string | null = localStorage.getItem("ETP-seting");
    if (setting == null) return "medium";
    const parsedObject: StorageSettingProps = JSON.parse(setting);
    console.log(parsedObject.grig_size);
    return parsedObject.grig_size;
  });

  useEffect(() => {
    localStorage.setItem(
      "ETP-seting",
      JSON.stringify({
        dynamic_background: isDynamicBackground,
        grig_size: gridSize,
      })
    );
  }, [isDynamicBackground, gridSize]);

  // dynamic-background-mechanism -----------------------------------------
  useEffect(() => {
    if (actualPhotos.length < 2 || !isDynamicBackground) return;
    fetchBackgroundImage(actualPhotos[1]); //[1] as the second photo looks better
  }, [actualPhotos, isDynamicBackground]);

function resetApp() {
  clearGallery();
  setIsDynamicBackground(false);
  setGridSize("medium");
  window.location.reload();
}

  return (
    <AppContext.Provider
      value={{
        isDynamicBackground,
        setIsDynamicBackground,
        gridSize,
        setGridSize,
        resetApp
      }}
    >
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
        <PhotosGrid />
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
    </AppContext.Provider>
  );
};

export default App;
