import { create } from "zustand";
import { U_STORY } from "../../data/defaultConst";
import Photo from "../../interfacesAndTypes/Photo";
import UStory from "../../interfacesAndTypes/UStory";
import UStoryPhoto from "../../interfacesAndTypes/UStoryPhoto";
import getLocalStorage from "../../services/getLocalStorage";

interface UStoryPhotoTitleProps {
  storyId: UStory["id"];
  photoId: UStoryPhoto["id"];
  name: UStoryPhoto["photoInStoryName"];
}

interface UStoryStoreProps {
  uStories: UStory[];
  isUStoryCreating: boolean;
  setIsUStoryCreating: (isCreating: boolean) => void;
  addingUStory: (photo: Photo, photoTitle: string, query: string) => void;
  deleteUStory: (uStoryId: Pick<UStory, "id">) => void;
  setDefaultUStories: () => void;
  changeUStoryName: ({ id, name }: Omit<UStory, "body">) => void;
  changePhotoNameInUStory: ({
    storyId,
    photoId,
    name,
  }: UStoryPhotoTitleProps) => void;
  deletePhotoInUStory: ({
    storyId,
    photoId,
  }: Omit<UStoryPhotoTitleProps, "name">) => void;
}

const useStories = create<UStoryStoreProps>((set) => ({
  uStories:
    getLocalStorage<UStory[]>(
      U_STORY.LOCAL_STORAGE_KEY,
      U_STORY.DEFAULT_VALUE
    ) || [],
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
    const newPhoto: UStoryPhoto = { ...photo, photoInStoryName: title };

    const getCurrent = useStories.getState();

    if (getCurrent.isUStoryCreating === false) {
      set({ isUStoryCreating: true });
      const newUStory = {
        id: crypto.randomUUID(),
        name: query,
        body: [newPhoto],
      };

      set((state) => ({ uStories: [newUStory, ...state.uStories] }));
    } else {
      const nowCretingStoryId = getCurrent.uStories[0].id;
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
    set({ uStories: U_STORY.DEFAULT_VALUE });
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
    U_STORY.LOCAL_STORAGE_KEY,
    JSON.stringify(useStories.getState().uStories)
  );
}
