import { create } from "zustand";
import getLocalStorage from "../../services/getLocalStorage";
import Photo from "../../interfacesAndTypes/Photo";
import { GALLERY } from "../../data/defaultConst";

interface GalleryStoreProps {
  gallery: Photo[];
  arrangeGallery: (photo: Photo) => void;
  setDefaultGallery: () => void;
  isInGallery: (photo: Photo) => boolean;
}

const LS_KEY = GALLERY.LOCAL_STORAGE_KEY;
const DEF_VALUE = GALLERY.DEFAULT_VALUE;

const useGallery = create<GalleryStoreProps>((set) => ({
  gallery: getLocalStorage<Photo[]>(LS_KEY, DEF_VALUE) || [],
  arrangeGallery: (photo) => {
    set((state) => {
      const updatedGallery = state.gallery.find((p) => p.id === photo.id)
        ? state.gallery.filter((item) => item.id !== photo.id)
        : [photo, ...state.gallery];
      return { gallery: updatedGallery };
    });
    saveGallery();
  },
  setDefaultGallery: () => {
    set({ gallery: DEF_VALUE });
    saveGallery();
  },
  isInGallery: (photo): boolean => {
    const current = useGallery.getState().gallery;
    return current.some((p) => p.id === photo.id);
  },
}));

export default useGallery;

function saveGallery() {
  localStorage.setItem(LS_KEY, JSON.stringify(useGallery.getState().gallery));
}
