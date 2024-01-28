import { createContext, useEffect, useState } from "react";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import OnStoryView from "./components/OnStoryView";
import PhotosGrid from "./components/PhotosGrid";
import SearchBar from "./components/SearchBar";
import Setting from "./components/setting/Setting";
import UStoryMain from "./components/uStory/UStoryMain";
import useStories from "./components/uStory/store";
import { PhotoType } from "./context/Photos";
import usePhotos from "./context/usePhotos";
import { USTORY_DEFAULT_PHOTOS } from "./data/defaultData";
import useLocalStorage from "./hooks/useLocalStorage";
import setBackgroundImage from "./services/extFunctions";
import "./styles.css";

export type GridSize = "small" | "medium" | "large";
export type UStorySize = GridSize;

const DEFAULT_GRID_SIZE: GridSize = "medium";
const DEFAULT_DYNAMIC_BACKGROUND: boolean = true;
const DEFAULT_USTORY_PHOTO_TITLE: boolean = false;
const DEFAULT_USTORY_SIZE: UStorySize = "medium";
const DEFAULT_STICKY_SEARCH_BAR: boolean = true;


interface AppContextProps {
  isDynamicBackground: boolean;
  setIsDynamicBackground: (active: boolean) => void;
  gridSize: GridSize;
  setGridSize: (size: GridSize) => void;
  resetApp: () => void;
  isUStoryRendered: boolean;
  setIsUStoryRendered: (active: boolean) => void;
  unblockAllUStorySettings: () => void;
  isAllUStorySettingClosed: boolean;
  uStorySize: UStorySize;
  setUStorySize: (size: UStorySize) => void;
  isSeenUStoryPhotoTitle: boolean;
  setIsSeenUStoryPhotoTitle: (active: boolean) => void;
  isAboutRendered: boolean;
  setIsAboutRendered: (active: boolean) => void;
  isSettingRendered: boolean;
  setIsSettingRendered: (active: boolean) => void;
  isSearchBarSticky: boolean;
  setIsSearchBarSticky: (active: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

// -----APP---------------------------------------------------------
export function App() {

  const {uStories, isUStoryCreating, setDefaultUStories} = useStories();
  const [isUStoryRendered, setIsUStoryRendered] = useState(false);
  const [isAllUStorySettingClosed, setIsAllUStorySettingClosed] =
    useState(false);
  const [isAboutRendered, setIsAboutRendered] = useState(false);
  const [isSettingRendered, setIsSettingRendered] = useState(false);
  const { actualPhotos, error, clearGallery } = usePhotos();
  const [isDynamicBackground, setIsDynamicBackground] =
    useLocalStorage<boolean>(
      "ETP-dynamic_background",
      DEFAULT_DYNAMIC_BACKGROUND
    );
  const [isSearchBarSticky, setIsSearchBarSticky] = useLocalStorage<boolean>(
    "ETP-sticky_search_bar",
    DEFAULT_STICKY_SEARCH_BAR
  );
  const [gridSize, setGridSize] = useLocalStorage<GridSize>(
    "ETP-grig_size",
    DEFAULT_GRID_SIZE
  );
  const [uStorySize, setUStorySize] = useLocalStorage<UStorySize>(
    "ETP-uStory_size",
    DEFAULT_USTORY_SIZE
  );

  const [isSeenUStoryPhotoTitle, setIsSeenUStoryPhotoTitle] =
    useLocalStorage<boolean>(
      "ETP-uStory_photo_title",
      DEFAULT_USTORY_PHOTO_TITLE
    );

  // dynamic-background-mechanism -----------------------------------------
  useEffect(() => {
    if (actualPhotos.length < 2 || !isDynamicBackground) return;
    setBackgroundImage(actualPhotos[1]); //[1] the second photo looks better
  }, [actualPhotos, isDynamicBackground]);

  useEffect(() => {
    setIsSettingRendered(false);
    setIsAboutRendered(false);
  }, [actualPhotos]);

  //----ECS btn for closing opened setting in all uStory carousels------
  useEffect(() => {
    if (!isUStoryRendered) return;

    const handleEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAllUStorySettingClosed(true);
        console.log("Escape");
      }
    };

    document.addEventListener("keydown", handleEvent);

    return () => {
      document.removeEventListener("keydown", handleEvent);
    };
  }, [isUStoryRendered]);

  function resetApp() {
    clearGallery();
    setDefaultUStories();
    setIsDynamicBackground(DEFAULT_DYNAMIC_BACKGROUND);
    setGridSize(DEFAULT_GRID_SIZE);
    setUStorySize(DEFAULT_GRID_SIZE);
    setIsSearchBarSticky(DEFAULT_STICKY_SEARCH_BAR);
    window.location.reload();
  }

  function unblockAllUStorySettings() {
    setIsAllUStorySettingClosed(false);
  }

  return (
    <AppContext.Provider
      value={{
        isDynamicBackground,
        setIsDynamicBackground,
        gridSize,
        setGridSize,
        resetApp,
        isUStoryRendered,
        setIsUStoryRendered,
        unblockAllUStorySettings,
        isAllUStorySettingClosed,
        uStorySize,
        setUStorySize,
        isSeenUStoryPhotoTitle,
        setIsSeenUStoryPhotoTitle,
        isAboutRendered,
        setIsAboutRendered,
        isSettingRendered,
        setIsSettingRendered,
        isSearchBarSticky,
        setIsSearchBarSticky,
      }}
    >
      <div className="main-container">
        <div className="header-and-nav-bar">
          <Header />
          <NavBar />
        </div>
        <SearchBar />
        {error && <div className="error">{error}</div>}
        {isAboutRendered ? (
          <About />
        ) : isSettingRendered ? (
          <Setting />
        ) : isUStoryRendered ? (
          <UStoryMain />
        ) : (
          <PhotosGrid />
        )}
        <Footer />
      </div>
      {isUStoryCreating && <OnStoryView uStory={uStories[uStories.length - 1]} />} 
    </AppContext.Provider>
  );
}
