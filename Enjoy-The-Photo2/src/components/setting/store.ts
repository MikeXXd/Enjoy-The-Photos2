import { create } from "zustand";
import {
  DYNAMIC_BACKGROUND,
  GRID_SIZE,
  STICKY_SEARCH_BAR,
  USTORY_PHOTO_TITLE,
  USTORY_SIZE,
} from "../../data/defaultConst";
import getLocalStorage from "../../services/getLocalStorage";
import saveToLocalStorage from "../../services/saveToLocalStorage";
import { GridSize, UStorySize } from "../../interfacesAndTypes/Sizes";

interface SettingProps {
  isDynamicBackground: boolean;
  setIsDynamicBackground: (value: boolean) => void;
  isSearchBarSticky: boolean;
  setIsSearchBarSticky: (value: boolean) => void;
  isSeenUStoryPhotoTitle: boolean;
  setIsSeenUStoryPhotoTitle: (value: boolean) => void;
  gridSize: GridSize;
  setGridSize: (size: GridSize) => void;
  uStorySize: UStorySize;
  setUStorySize: (size: UStorySize) => void;
}

const useAppSetting = create<SettingProps>((set) => ({
  //dynamic background------------------
  isDynamicBackground: getLocalStorage<boolean>(
    DYNAMIC_BACKGROUND.LOCAL_STORAGE_KEY,
    DYNAMIC_BACKGROUND.DEFAULT_VALUE
  ),
  setIsDynamicBackground: (value) => {
    set({
      isDynamicBackground: value,
    });
    saveToLocalStorage<Boolean>(DYNAMIC_BACKGROUND.LOCAL_STORAGE_KEY, value);
  },
  //sticky search bar------------------
  isSearchBarSticky: getLocalStorage<boolean>(
    STICKY_SEARCH_BAR.LOCAL_STORAGE_KEY,
    STICKY_SEARCH_BAR.DEFAULT_VALUE
  ),
  setIsSearchBarSticky: (value) => {
    set({
      isSearchBarSticky: value,
    });
    saveToLocalStorage<Boolean>(STICKY_SEARCH_BAR.LOCAL_STORAGE_KEY, value);
  },
  //uStory photo title------------------
  isSeenUStoryPhotoTitle: getLocalStorage<boolean>(
    USTORY_PHOTO_TITLE.LOCAL_STORAGE_KEY,
    USTORY_PHOTO_TITLE.DEFAULT_VALUE
  ),
  setIsSeenUStoryPhotoTitle: (value) => {
    set({
      isSeenUStoryPhotoTitle: value,
    });
    saveToLocalStorage<Boolean>(USTORY_PHOTO_TITLE.LOCAL_STORAGE_KEY, value);
  },
  //masonri grid size------------------
  gridSize: getLocalStorage<GridSize>(
    GRID_SIZE.LOCAL_STORAGE_KEY,
    GRID_SIZE.DEFAULT_VALUE
  ),
  setGridSize: (value) => {
    set({
      gridSize: value,
    });
    saveToLocalStorage<GridSize>(GRID_SIZE.LOCAL_STORAGE_KEY, value);
  },
  //uStory size------------------
  uStorySize: getLocalStorage<UStorySize>(
    USTORY_SIZE.LOCAL_STORAGE_KEY,
    USTORY_SIZE.DEFAULT_VALUE
  ),
  setUStorySize: (value) => {
    set({
      uStorySize: value,
    });
    saveToLocalStorage<UStorySize>(USTORY_SIZE.LOCAL_STORAGE_KEY, value);
  },
}));

export default useAppSetting;
