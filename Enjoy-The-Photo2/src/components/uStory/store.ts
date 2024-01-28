import { create } from "zustand";
import { USTORY_DEFAULT_PHOTOS } from "../../data/defaultData";
import getLocalStorage from "../../services/getLocalStorage";
import { PhotoType } from "../../context/Photos";

const LS_USTORY_KEY = "ETP-uStory";

interface UStoryPhotoTitleType {
  storyId: UStoryType["id"];
  photoId: UStoryChain["id"];
  name: UStoryChain["photoInStoryName"];
}

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

interface UStoryStoreProps {
  uStories: UStoryType[];
  isUStoryCreating: boolean; //IMPLEMENTED
  setIsUStoryCreating: (isCreating: boolean) => void; //IMPLEMENTED
  addingUStory: (photo: PhotoType, photoTitle: string, query: string) => void; //IMPLEMENTED

  deleteUStory: (uStoryId: Pick<UStoryType, "id">) => void; //IMPLEMENTED
  setDefaultUStories: () => void; //IMPLEMENTED
  changeUStoryName: ({ id, name }: Omit<UStoryType, "body">) => void;
  changePhotoNameInUStory: ({
    storyId,
    photoId,
    name,
  }: UStoryPhotoTitleType) => void;
  deletePhotoInUStory: ({
    storyId,
    photoId,
  }: Omit<UStoryPhotoTitleType, "name">) => void; //IMPLEMENTED
}

const useStories = create<UStoryStoreProps>((set) => ({
  uStories:
    getLocalStorage<UStoryType[]>(LS_USTORY_KEY, USTORY_DEFAULT_PHOTOS) || [],
  isUStoryCreating: false,
  setIsUStoryCreating: (value) => set({ isUStoryCreating: value }),

  deleteUStory: (uStoryId) => {
    set((state) => ({
      uStories: state.uStories.filter((story) => story.id !== uStoryId.id),
    }));
    saveUStoriesToLC();
  },
  addingUStory: (photo, photoTitle, query) => {
    const title = photoTitle === query ? query : photoTitle; // if photoTitle =  query, it means that photo is added but no new query search initiated
    const newPhoto: UStoryChain = { ...photo, photoInStoryName: title };

    const getCurrent = useStories.getState();

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
      saveUStoriesToLC();
    }
  },
  deletePhotoInUStory: ({ storyId, photoId }) => {
    set((state) => ({
      uStories: state.uStories.map((story) =>
        story.id === storyId
          ? {
              ...story,
              body: story.body.filter((photo) => photo.id !== photoId),
            }
          : story
      ),
    }));
    saveUStoriesToLC();
  },
  setDefaultUStories: () => {
    set({ uStories: USTORY_DEFAULT_PHOTOS });
    saveUStoriesToLC();
  },
  changePhotoNameInUStory: ({ storyId, photoId, name }) => {
    set((state) => ({
      uStories: state.uStories.map((story) =>
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
      ),
    }));
    saveUStoriesToLC();
  },
  changeUStoryName: ({ id, name }) => {
    set((state) => ({
      uStories: state.uStories.map((story) =>
        story.id === id ? { ...story, name } : story
      ),
    }));
    saveUStoriesToLC();
  },
}));

export default useStories;

function saveUStoriesToLC() {
  localStorage.setItem(
    LS_USTORY_KEY,
    JSON.stringify(useStories.getState().uStories)
  );
}
