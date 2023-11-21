import { ReactNode, createContext, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

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
  userId: string;
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
  clearGallery: () => void;
}

interface FetchPhotosResponse {
  results: PhotoType[];
}

export const Context = createContext<PhotosContext | null>(null);

export function PhotosProvider({ children }: { children: ReactNode }) {
  const [actualPhotos, setActualPhotos] = useState<PhotoType[]>([]);

  const [error, setError] = useState("");
  const [query, setQuery] = useState("nature");
  const [pageNo, setPageNo] = useState(1);

  // const [gallery, setGallery] = useState<PhotoType[]>(() => {
  //   const getGalery = localStorage.getItem("ETP-galery");
  //   if (getGalery == null) return [];
  //   return [...JSON.parse(getGalery)];
  // });

  const [gallery, setGallery] = useLocalStorage<PhotoType[]>("ETP-galery", []);


  const [isGalleryRendered, setIsGalleryRendered] = useState(false);


  console.log(actualPhotos)
  
  // useEffect(() => {
  //   localStorage.setItem("ETP-galery", JSON.stringify(gallery));
  // }, [gallery]);

  useEffect(() => {
    setIsGalleryRendered(false);
    const controller = new AbortController();

    apiClient
      .get<FetchPhotosResponse>(
        `photos?page=${pageNo}&per_page=31&query=${query}`,
        { signal: controller.signal }
      )
      .then((res) => setActualPhotos(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, [query, pageNo]);

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
    setGallery([]);
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
        clearGallery
      }}
    >
      {children}
    </Context.Provider>
  );
}
