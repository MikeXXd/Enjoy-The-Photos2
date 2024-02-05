import { CanceledError } from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { INNITIAL_QUERY } from "../data/defaultConst";
import apiClient from "../services/api-client";
import Photo from "../interfacesAndTypes/Photo";

export interface PhotosContext {
  actualPhotos: Photo[];
  error: string;
  query: string;
  setNewQuery: (query: string) => void;
  pageNo: number;
  setPageNo: (pageNo: number) => void;
}

interface FetchPhotosResponse {
  results: Photo[];
}

export const Context = createContext<PhotosContext>({} as PhotosContext);

export function PhotosProvider({ children }: { children: ReactNode }) {
  const [actualPhotos, setActualPhotos] = useState<Photo[]>([]);

  const [error, setError] = useState("");
  const [query, setQuery] = useState(INNITIAL_QUERY);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
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

  function setNewQuery(query: string) {
    setQuery(query);
    setPageNo(1);
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
      }}
    >
      {children}
    </Context.Provider>
  );
}
