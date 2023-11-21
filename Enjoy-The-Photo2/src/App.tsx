import "./styles.css";
import PhotosGrid from "./components/PhotosGrid";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import usePhotos from "./context/usePhotos";
import imgTriangle from "./img/icons8-triangle-color-96.png";
import { createContext, useEffect, useState, useCallback } from "react";
import { fetchBackgroundImage } from "./services/extFunctions";
import React from "react";
import useLocalStorage from "./hooks/useLocalStorage";

interface AppContextProps {
  isDynamicBackground: boolean;
  setIsDynamicBackground: (active: boolean) => void;
  gridSize: GridSize;
  setGridSize: (size: GridSize) => void;
  resetApp: () => void;
}

export const AppContext = createContext<AppContextProps | null>(null);

type GridSize = "small" | "medium" | "large";

// interface StorageSettingProps {
//   dynamic_background: boolean;
//   grig_size: GridSize;
// }

const DEFAULT_GRID_SIZE: GridSize = "medium";
const DEFAULT_DYNAMIC_BACKGROUND = false;

// function getInitialSetting<T extends keyof StorageSettingProps>(
//   key: T,
//   defaultValue: StorageSettingProps[T]
// ): StorageSettingProps[T] {
//   const setting: string | null = localStorage.getItem("ETP-seting");
//   if (setting == null) return defaultValue;
//   const parsedObject: StorageSettingProps = JSON.parse(setting);
//   return parsedObject[key];
// }

// -----APP---------------------------------------------------------
export function App() {
  const { actualPhotos, error, clearGallery } = usePhotos();
  // const [isDynamicBackground, setIsDynamicBackground] = useState<boolean>(
  //   () => getInitialSetting("dynamic_background", DEFAULT_DYNAMIC_BACKGROUND)
  // );

  const [isDynamicBackground, setIsDynamicBackground] = useLocalStorage<boolean>("dynamic_background", DEFAULT_DYNAMIC_BACKGROUND);

  const [gridSize, setGridSize] = useLocalStorage<GridSize>("dynamic_background", DEFAULT_GRID_SIZE);
  
  // const [gridSize, setGridSize] = useState<GridSize>(() =>
  //   getInitialSetting("grig_size", DEFAULT_GRID_SIZE)
  // );

  // useEffect(() => {
  //   localStorage.setItem(
  //     "ETP-seting",
  //     JSON.stringify({
  //       dynamic_background: isDynamicBackground,
  //       grig_size: gridSize,
  //     })
  //   );
  // }, [isDynamicBackground, gridSize]);

  // dynamic-background-mechanism -----------------------------------------
  useEffect(() => {
    if (actualPhotos.length < 2 || !isDynamicBackground) return;
    fetchBackgroundImage(actualPhotos[1]); //[1] as the second photo looks better
  }, [actualPhotos, isDynamicBackground]);

  const resetApp = useCallback(() => {
    clearGallery();
    setIsDynamicBackground(DEFAULT_DYNAMIC_BACKGROUND);
    setGridSize(DEFAULT_GRID_SIZE);
    window.location.reload();
  }, [clearGallery, setIsDynamicBackground, setGridSize]);

  return (
    <AppContext.Provider
      value={{
        isDynamicBackground,
        setIsDynamicBackground,
        gridSize,
        setGridSize,
        resetApp,
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
        <PhotosGridMemoized />
        <footer className="footer">
          <span>
            Created by
            <a href="https://www.linkedin.com/in/michal-vili%C5%A1-483196251/">MikeXd</a> 2023
          </span>
        </footer>
      </div>
    </AppContext.Provider>
  );
};

const PhotosGridMemoized = React.memo(PhotosGrid);


