import { GridSize, UStorySize } from "../components/setting/Setting";

interface Props<T>{
    LOCAL_STORAGE_KEY: string;
    DEFAULT_VALUE: T;
}

//dynamic background
export const DYNAMIC_BACKGROUND: Props<boolean> = {
    LOCAL_STORAGE_KEY: "ETP-dynamic_background",
    DEFAULT_VALUE: false,
}
//sticky search bar
export const STICKY_SEARCH_BAR: Props<boolean> = {
    LOCAL_STORAGE_KEY: "ETP-sticky_search_bar",
    DEFAULT_VALUE: true,
}
//uStory photo title
export const USTORY_PHOTO_TITLE: Props<boolean> = {
    LOCAL_STORAGE_KEY: "ETP-uStory_photo_title",
    DEFAULT_VALUE: false,
}
//masonri grid size
export const GRID_SIZE: Props<GridSize>  = {
    LOCAL_STORAGE_KEY: "ETP-grid_size",
    DEFAULT_VALUE: "medium",
}
//uStory size
export const USTORY_SIZE: Props<UStorySize> = {
    LOCAL_STORAGE_KEY: "ETP-uStory_size",
    DEFAULT_VALUE: "medium",
}