import { GridSize, UStorySize } from "../interfacesAndTypes/Sizes";
import Photo from "../interfacesAndTypes/Photo";
import UStory from "../interfacesAndTypes/UStory";
import { GALERY_DEFAULT_DATA, USTORY_DEFAULT_DATA } from "./defaultData";

interface Props<T> {
  LOCAL_STORAGE_KEY: string;
  DEFAULT_VALUE: T;
}

export const PHOTOS_PER_PAGE: number = 30

//default query
export const INNITIAL_QUERY: string = "enter space time";

// gallery
export const GALLERY: Props<Photo[]> = createProps("ETP-gallery", GALERY_DEFAULT_DATA);

//uStory
export const U_STORY: Props<UStory[]> = createProps("ETP-uStory", USTORY_DEFAULT_DATA);

//dynamic background
export const DYNAMIC_BACKGROUND: Props<boolean> = createProps("ETP-dynamic_background", true);

//sticky search bar
export const STICKY_SEARCH_BAR: Props<boolean> = createProps("ETP-sticky_search_bar", true);

//uStory photo title
export const USTORY_PHOTO_TITLE: Props<boolean> = createProps("ETP-uStory_photo_title", false);

//masonri grid size
export const GRID_SIZE: Props<GridSize> = createProps("ETP-grid_size", "medium");

//uStory size
export const USTORY_SIZE: Props<UStorySize> = createProps("ETP-uStory_size", "medium");

//--------------------FUNCTIONS--------------------

function createProps<T>(localStorageKey: string, defaultValue: T): Props<T> {
  return {
    LOCAL_STORAGE_KEY: localStorageKey,
    DEFAULT_VALUE: defaultValue,
  };
}