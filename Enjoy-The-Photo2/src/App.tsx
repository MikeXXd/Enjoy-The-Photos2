import "./styles.css";
import PhotosGrid from "./components/PhotosGrid";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import usePhotos from "./context/usePhotos";
import imgTriangle from "./img/icons8-triangle-color-96.png";
import { createContext, useEffect, useCallback, useState, memo } from "react";
import { fetchBackgroundImage } from "./services/extFunctions";
import useLocalStorage from "./hooks/useLocalStorage";
import { PhotoType } from "./context/Photos";
import { cc } from "./utils/cc";
import UStoryMain from "./components/UStoryMain";

type GridSize = "small" | "medium" | "large";

const DEFAULT_GRID_SIZE: GridSize = "medium";
const DEFAULT_DYNAMIC_BACKGROUND = false;

interface UStoryChain extends PhotoType {
  photoQueryName: string;
}

interface UStoryType {
  id: number;
  name: string;
  body: UStoryChain[];
}

interface AppContextProps {
  isDynamicBackground: boolean;
  setIsDynamicBackground: (active: boolean) => void;
  gridSize: GridSize;
  setGridSize: (size: GridSize) => void;
  resetApp: () => void;
  isUStoryCreating: boolean;
  setIsUStoryCreating: (active:boolean) => void;
  arrangeUStory: (photo:PhotoType) => void;
  isUStoryRendered: boolean;
  setIsUStoryRendered: (active:boolean) => void;
  uStory: UStoryType[];
}

export const AppContext = createContext<AppContextProps | null>(null);

// -----APP---------------------------------------------------------
export function App() {
  const [isUStoryRendered, setIsUStoryRendered] = useState(false);
  const [isUStoryCreating, setIsUStoryCreating] = useState(false);
  const { query, actualPhotos, error, clearGallery } = usePhotos();
  const [isDynamicBackground, setIsDynamicBackground] =
    useLocalStorage<boolean>(
      "ETP-dynamic_background",
      DEFAULT_DYNAMIC_BACKGROUND
    );
  const [gridSize, setGridSize] = useLocalStorage<GridSize>(
    "ETP-grig_size",
    DEFAULT_GRID_SIZE
  );
  const [uStory, setUStory] = useLocalStorage<UStoryType[]>("ETP-uStory", []);

  // dynamic-background-mechanism -----------------------------------------
  useEffect(() => {
    if (actualPhotos.length < 2 || !isDynamicBackground) return;
    fetchBackgroundImage(actualPhotos[1]); //[1] as the second photo looks better
  }, [actualPhotos, isDynamicBackground]);
  //--------------------------------------------------------------------------

  const resetApp = useCallback(() => {
    clearGallery();
    setIsDynamicBackground(DEFAULT_DYNAMIC_BACKGROUND);
    setGridSize(DEFAULT_GRID_SIZE);
    window.location.reload();
  }, [clearGallery, setIsDynamicBackground, setGridSize]);

//---Arranging uStory--------------------------------------------------------
  function arrangeUStory(photo: PhotoType) {
      const newPhoto:UStoryChain = {...photo, photoQueryName: query}

    if (!isUStoryCreating) {
      setIsUStoryCreating(true)
      const newUStory = {id: Math.random()*1000, name: query, body: [newPhoto]}
      setUStory([...uStory, newUStory])
    }
    else {
      const currentUStory = uStory[uStory.length - 1].id
      setUStory(uStory.map(story => story.id === currentUStory ? {...story, body: [...story.body, newPhoto]} : story))
    }
  }
//------------------------------------------------------------------------------
  return (
    <AppContext.Provider
      value={{
        isDynamicBackground,
        setIsDynamicBackground,
        gridSize,
        setGridSize,
        resetApp,
        isUStoryCreating,
        setIsUStoryCreating,
        arrangeUStory,
        isUStoryRendered,
        setIsUStoryRendered,
        uStory
      }}
    >
      <div className="main-container">
        <div className="header-and-nav-bar">
          <span className="pre-header hide-on-small-device">
            Breath in the depth of colors and geometry, jump in and enjoooooy!
          </span>
          <header className="header">
            <img className={cc("header-img",isUStoryCreating && "ustorying")} src={imgTriangle}  />
            <h1>Enjoy the Photos2</h1>
          </header>
          <NavBar />
        </div>
        <SearchBar />
        {error && <div className="error">{error}</div>}
        {isUStoryRendered ? <UStoryMain/> : <PhotosGrid />}
        <footer className="footer">
          <span>
            Created by
            <a href="https://www.linkedin.com/in/michal-vili%C5%A1-483196251/">
              MikeXd
            </a>{" "}
            2023
          </span>
        </footer>
      </div>
    </AppContext.Provider>
  );
}


