import { createContext, useEffect, useState } from "react";
import About from "./Pages/AboutPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import OnStoryView from "./components/OnStoryView";
import PhotosGrid from "./components/PhotosGrid";
import SearchBar from "./components/SearchBar";
import Setting from "./components/setting/Setting";
import useAppSetting from "./components/setting/store";
import UStoryMain from "./components/uStory/YouStory";
import useStories from "./components/uStory/store";
import usePhotos from "./context/usePhotos";
import setBackgroundImage from "./services/extFunctions";
import "./styles.css";

interface AppContextProps {
  isUStoryRendered: boolean;
  setIsUStoryRendered: (active: boolean) => void;
  unblockAllUStorySettings: () => void;
  isAllUStorySettingClosed: boolean;
  isAboutRendered: boolean;
  setIsAboutRendered: (active: boolean) => void;
  isSettingRendered: boolean;
  setIsSettingRendered: (active: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

// -----APP---------------------------------------------------------
export function App() {
  const { actualPhotos, error } = usePhotos();

  const { uStories, isUStoryCreating } = useStories();

  const { isDynamicBackground } = useAppSetting();

  const [isUStoryRendered, setIsUStoryRendered] = useState(false);
  const [isAllUStorySettingClosed, setIsAllUStorySettingClosed] =
    useState(false);
  const [isAboutRendered, setIsAboutRendered] = useState(false);
  const [isSettingRendered, setIsSettingRendered] = useState(false);

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

  function unblockAllUStorySettings() {
    setIsAllUStorySettingClosed(false);
  }

  return (
    <AppContext.Provider
      value={{
        isUStoryRendered,
        setIsUStoryRendered,
        unblockAllUStorySettings,
        isAllUStorySettingClosed,
        isAboutRendered,
        setIsAboutRendered,
        isSettingRendered,
        setIsSettingRendered,
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
      {isUStoryCreating && (
        <OnStoryView uStory={uStories[uStories.length - 1]} />
      )}
    </AppContext.Provider>
  );
}
