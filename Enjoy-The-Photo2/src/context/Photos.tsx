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
    results: PhotoType[];
    error: string;
    query: string;
    setQuery: (query: string) => void;
    pageNo: number;
    setPageNo: (pageNo: number) => void;
    galery: PhotoType[];
    setGalery: (Galery:PhotoType[]) => void;

}

interface FetchPhotosResponse {
  results: PhotoType[];
}

export const Context = createContext<PhotosContext | null>(null) 
 




export function PhotosProvider({ children }: { children: ReactNode }) {
    
    const [results, setResults] = useState<PhotoType[]>([]);
      const [error, setError] = useState("");
      const [query, setQuery] = useState("enjoy");
      const [pageNo, setPageNo] = useState(1);

      const [galery, setGalery] = useState<PhotoType[]>([])
    
    
      useEffect(() => {
        const controller = new AbortController();
    
        apiClient
          .get<FetchPhotosResponse>(
            `photos?page=${pageNo}&per_page=31&query=${query}`,
            { signal: controller.signal }
          )
          .then((res) => setResults(res.data.results))
          .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
          });
    
        return () => controller.abort();
      }, [query, pageNo]);




    return <Context.Provider value={{results, error, query, setQuery, pageNo, setPageNo, galery, setGalery}}>{children}</Context.Provider>;
    }

