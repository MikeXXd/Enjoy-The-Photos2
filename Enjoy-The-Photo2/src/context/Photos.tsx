import { ReactNode, createContext, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface PhotoType {
  id: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  alt_description: string;
  userId: string;
  height: number;
  width: number;
}

interface PhotosContext {
  actualPhotos: PhotoType[];
  error: string;
  query: string;
  setQuery: (query: string) => void;
  pageNo: number;
  setPageNo: (pageNo: number) => void;
  gallery: PhotoType[];
  arrangeGallery: (Photo: PhotoType) => void;
  renderGallery: () => void;
  isGalleryRendered: boolean;
}

interface FetchPhotosResponse {
  results: PhotoType[];
}

export const Context = createContext<PhotosContext | null>(null);

export function PhotosProvider({ children }: { children: ReactNode }) {
  const [actualPhotos, setActualPhotos] = useState<PhotoType[]>([]);

  const [error, setError] = useState("");
  const [query, setQuery] = useState("enjoy");
  const [pageNo, setPageNo] = useState(1);

    const [gallery, setGallery] = useState<PhotoType[]>(
      () => {
        const getGalery = localStorage.getItem('ETP-galery');
        if (getGalery == null ) return [];
        return [...JSON.parse(getGalery)]
      });
      
    const [isGalleryRendered, setIsGalleryRendered] = useState(false);

    useEffect(() => {
      localStorage.setItem('ETP-galery', JSON.stringify(gallery))
    }, [gallery]);


  useEffect(() => {
    setIsGalleryRendered(false)
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

  function renderGallery() {
    if (gallery.length < 1) return null
    {setActualPhotos(gallery)
    setIsGalleryRendered(true)}}


  return (
    <Context.Provider
      value={{
        actualPhotos,
        error,
        query,
        setQuery,
        pageNo,
        setPageNo,
        gallery,
        arrangeGallery,
        renderGallery,
        isGalleryRendered,
      }}
    >
      {children}
    </Context.Provider>
  );
}
