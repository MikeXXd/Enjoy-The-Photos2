import { createContext, useEffect, useState } from "react";
import { GiFlowerEmblem } from "react-icons/gi";
import About from "./components/About";
import NavBar from "./components/NavBar";
import OnStoryView from "./components/OnStoryView";
import PhotosGrid from "./components/PhotosGrid";
import SearchBar from "./components/SearchBar";
import Setting from "./components/setting/Setting";
import UStoryMain from "./components/uStory/UStoryMain";
import { PhotoType } from "./context/Photos";
import usePhotos from "./context/usePhotos";
import { USTORY_DEFAULT_PHOTOS } from "./data/defaultData";
import useLocalStorage from "./hooks/useLocalStorage";
import imgTriangle from "./img/icons8-triangle-color-96.png";
import setBackgroundImage from "./services/extFunctions";
import "./styles.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

export type GridSize = "small" | "medium" | "large";
export type UStorySize = GridSize;

const DEFAULT_GRID_SIZE: GridSize = "medium";
const DEFAULT_DYNAMIC_BACKGROUND: boolean = true;
const DEFAULT_USTORY_PHOTO_TITLE: boolean = false;
const DEFAULT_USTORY_SIZE: UStorySize = "medium";
const DEFAULT_STICKY_SEARCH_BAR: boolean = true;

export interface UStoryChain extends PhotoType {
  photoInStoryName: string;
}

export interface UStoryType {
  id: string;
  name: string;
  body: UStoryChain[];
}

interface UStoryPhotoTitleType {
  storyId: UStoryType["id"];
  photoId: UStoryChain["id"];
  name: UStoryChain["photoInStoryName"];
}

interface AppContextProps {
  isDynamicBackground: boolean;
  setIsDynamicBackground: (active: boolean) => void;
  gridSize: GridSize;
  setGridSize: (size: GridSize) => void;
  resetApp: () => void;
  isUStoryCreating: boolean;
  setIsUStoryCreating: (active: boolean) => void;
  arrangeUStory: (photo: PhotoType, photoTitle: string) => void;
  isUStoryRendered: boolean;
  setIsUStoryRendered: (active: boolean) => void;
  uStory: UStoryType[];
  changeUStoryTitle: (titleStory: Omit<UStoryType, "body">) => void;
  deleteUStory: (id: Pick<UStoryType, "id">) => void;
  changeUStoryPhotoTitle: (titlePhoto: UStoryPhotoTitleType) => void;
  deleteUStoryPhoto: (id: Omit<UStoryPhotoTitleType, "name">) => void;
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
  const [isUStoryRendered, setIsUStoryRendered] = useState(false);
  const [isUStoryCreating, setIsUStoryCreating] = useState(false);
  const [isAllUStorySettingClosed, setIsAllUStorySettingClosed] =
    useState(false);
  const [isAboutRendered, setIsAboutRendered] = useState(false);
  const [isSettingRendered, setIsSettingRendered] = useState(false);
  const { query, actualPhotos, error, clearGallery } = usePhotos();
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

  const [uStory, setUStory] = useLocalStorage<UStoryType[]>(
    "ETP-uStory",
    USTORY_DEFAULT_PHOTOS
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
    setUStory(USTORY_DEFAULT_PHOTOS);
    setIsDynamicBackground(DEFAULT_DYNAMIC_BACKGROUND);
    setGridSize(DEFAULT_GRID_SIZE);
    setUStorySize(DEFAULT_GRID_SIZE);
    setIsSearchBarSticky(DEFAULT_STICKY_SEARCH_BAR);
    window.location.reload();
  }

  //---Arranging uStory--------------------------------------------------------
  function arrangeUStory(photo: PhotoType, photoTitle: string) {
    const title = photoTitle === query ? query : photoTitle; // if photoTitle =  query, it means that photo is added but no new query search initiated
    const newPhoto: UStoryChain = { ...photo, photoInStoryName: title };
    if (!isUStoryCreating) {
      setIsUStoryCreating(true);
      const newUStory = {
        id: crypto.randomUUID(),
        name: query,
        body: [newPhoto],
      };
      setUStory([...uStory, newUStory]);
    } else {
      const currentUStory = uStory[uStory.length - 1].id;
      setUStory(
        uStory.map((story) =>
          story.id === currentUStory
            ? { ...story, body: [...story.body, newPhoto] }
            : story
        )
      );
    }
  }

  function changeUStoryTitle({ id, name }: Omit<UStoryType, "body">) {
    setUStory(
      uStory.map((story) => (story.id === id ? { ...story, name } : story))
    );
  }

  function deleteUStory({ id }: Pick<UStoryType, "id">) {
    setUStory(uStory.filter((story) => story.id !== id));
  }

  function changeUStoryPhotoTitle({
    storyId,
    photoId,
    name,
  }: UStoryPhotoTitleType) {
    setUStory((prevUStory) =>
      prevUStory.map((story) =>
        story.id === storyId
          ? {
              ...story,
              body: story.body.map((photo) =>
                photo.id === photoId
                  ? { ...photo, photoInStoryName: name }
                  : photo
              ),
            }
          : story
      )
    );
  }

  function deleteUStoryPhoto({
    storyId,
    photoId,
  }: Omit<UStoryPhotoTitleType, "name">) {
    setUStory((prevUStory) =>
      prevUStory.map((story) =>
        story.id === storyId
          ? {
              ...story,
              body: story.body.filter((photo) => photo.id !== photoId),
            }
          : story
      )
    );
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
        isUStoryCreating,
        setIsUStoryCreating,
        arrangeUStory,
        isUStoryRendered,
        setIsUStoryRendered,
        uStory,
        changeUStoryTitle,
        deleteUStory,
        changeUStoryPhotoTitle,
        deleteUStoryPhoto,
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
      {isUStoryCreating && <OnStoryView uStory={uStory[uStory.length - 1]} />} 
    </AppContext.Provider>
  );
}
