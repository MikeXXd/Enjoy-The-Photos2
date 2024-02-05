import { create } from "zustand";
import getLocalStorage from "../../services/getLocalStorage";
import { PhotoType } from "../../context/Photos";
import { GALLERY } from "../../data/defaultConst";

interface GalleryStoreProps {
  gallery: PhotoType[];
  arrangeGallery: (photo: PhotoType) => void;
  setDefaultGallery: () => void;
  isInGallery: (photo: PhotoType) => boolean;
}

const useGallery = create<GalleryStoreProps>((set) => ({
  gallery:
    getLocalStorage<PhotoType[]>(
      GALLERY.LOCAL_STORAGE_KEY,
      GALLERY.DEFAULT_VALUE
    ) || [],
  arrangeGallery: (photo) => {
    set((state) => {
      const updatedGallery = state.gallery.find((p) => p.id === photo.id)
        ? state.gallery.filter((item) => item.id !== photo.id)
        : [photo, ...state.gallery];
      return { gallery: updatedGallery };
    });
    saveGalleryToLC();
  },
  setDefaultGallery: () => {
    set({ gallery: GALLERY.DEFAULT_VALUE });
    saveGalleryToLC();
  },
  isInGallery: (photo): boolean => {
    const current = useGallery.getState().gallery;
    return current.some((p) => p.id === photo.id);
  },
}));

export default useGallery;

function saveGalleryToLC() {
  localStorage.setItem(
    GALLERY.LOCAL_STORAGE_KEY,
    JSON.stringify(useGallery.getState().gallery)
  );
}
