import { create } from "zustand";
import { UStoryChain, UStoryType } from "../../App";
import { USTORY_DEFAULT_PHOTOS } from "../../data/defaultData";
import getLocalStorage from "../../services/getLocalStorage";
import { PhotoType } from "../../context/Photos";

interface UStoryStoreProps {
  uStories: UStoryType[];
  isUStoryCreating: boolean;
  setIsUStoryCreating: (isCreating: boolean) => void;
  loadUStories: (stories: UStoryType[]) => void;
  addingUStory: (photo: PhotoType, photoTitle: string, query: string) => void;
  // removeUStory: (uStory: UStoryType) => void;
  // setDefaultUStories: () => void;
  // changeUStoryName: (uStory: UStoryType) => void;
  // changePhotoNameInUStory: (uStory: UStoryType) => void;
  // deletePhotoInUStory: (uStory: UStoryType) => void;
}

const useUStoriesStore = create<UStoryStoreProps>((set) => ({
  uStories:
    getLocalStorage<UStoryType[]>("ETP-uStory", USTORY_DEFAULT_PHOTOS) || [],
  loadUStories: (stories) => set({ uStories: stories }),
  isUStoryCreating: false,
  setIsUStoryCreating: (value) => set({ isUStoryCreating: value }),
  addingUStory: (photo, photoTitle, query) => {
    const title = photoTitle === query ? query : photoTitle; // if photoTitle =  query, it means that photo is added but no new query search initiated
    const newPhoto: UStoryChain = { ...photo, photoInStoryName: title };

    const getCurrent = useUStoriesStore.getState();

    if (getCurrent.isUStoryCreating === false) {
      set({ isUStoryCreating: true });
      const newUStory = {
        id: crypto.randomUUID(),
        name: query,
        body: [newPhoto],
      };

      set((state) => ({ uStories: [...state.uStories, newUStory] }));
    } else {
      const nowCretingStoryId =
        getCurrent.uStories[getCurrent.uStories.length - 1].id;
      set((state) => ({
        uStories: state.uStories.map((story) =>
          story.id === nowCretingStoryId
            ? { ...story, body: [...story.body, newPhoto] }
            : story
        ),
      }));
    }
  },
}));

export default useUStoriesStore;
