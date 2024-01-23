import { CanceledError } from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { GALERY_DEFAULT_PHOTOS } from "../data/defaultData";
import useLocalStorage from "../hooks/useLocalStorage";
import apiClient from "../services/api-client";

export interface PhotoType {
  id: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
  description: string;
  alt_description: string;
}

export interface PhotosContext {
  actualPhotos: PhotoType[];
  error: string;
  query: string;
  setNewQuery: (query: string) => void;
  pageNo: number;
  setPageNo: (pageNo: number) => void;
  gallery: PhotoType[];
  arrangeGallery: (Photo: PhotoType) => void;
  renderGallery: () => void;
  isGalleryRendered: boolean;
  setIsGalleryRendered: (active: boolean) => void;
  clearGallery: () => void;
  isInGalery: (photo: PhotoType) => boolean;
}

interface FetchPhotosResponse {
  results: PhotoType[];
}

export const Context = createContext<PhotosContext | null>(null);

export function PhotosProvider({ children }: { children: ReactNode }) {
  const [actualPhotos, setActualPhotos] = useState<PhotoType[]>([]);

  const [error, setError] = useState("");
  const [query, setQuery] = useState("scenery rock");
  const [pageNo, setPageNo] = useState(1);

  const [isGalleryRendered, setIsGalleryRendered] = useState(false);
  const [gallery, setGallery] = useLocalStorage<PhotoType[]>(
    "ETP-galery",
    GALERY_DEFAULT_PHOTOS
  );

  console.log(actualPhotos);

  useEffect(() => {
    setIsGalleryRendered(false);
    const controller = new AbortController();

    apiClient
      .get<FetchPhotosResponse>(`photos`, {
        signal: controller.signal,
        params: {
          page: pageNo,
          per_page: 30,
          query,
        },
      })
      .then((res) => setActualPhotos(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [query, pageNo]);

  useEffect(() => {
    if (gallery.length >= 1 || !isGalleryRendered) return;
    setGallery([]);
    setIsGalleryRendered(false);
    setQuery("empty gallery");
  }, [gallery]);

  function arrangeGallery(photo: PhotoType) {
    if (gallery.find((p) => p.id === photo.id)) {
      setGallery(gallery.filter((item) => item.id !== photo.id));
    } else {
      setGallery([photo, ...gallery]);
    }
  }

  function setNewQuery(query: string) {
    setQuery(query);
    setPageNo(1);
  }

  function renderGallery() {
    if (gallery.length < 1) return null;
    {
      setActualPhotos(gallery);
      setIsGalleryRendered(true);
    }
  }

  function clearGallery() {
    setGallery(GALERY_DEFAULT_PHOTOS);
  }

  function isInGalery(photo: PhotoType) {
    const isOrNot = gallery.find((p) => p.id === photo.id);
    return isOrNot ? true : false;
  }

  return (
    <Context.Provider
      value={{
        actualPhotos,
        error,
        query,
        setNewQuery,
        pageNo,
        setPageNo,
        gallery,
        arrangeGallery,
        renderGallery,
        isGalleryRendered,
        setIsGalleryRendered,
        clearGallery,
        isInGalery,
      }}
    >
      {children}
    </Context.Provider>
  );
}
