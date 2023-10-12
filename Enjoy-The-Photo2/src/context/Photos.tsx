import { ReactNode, createContext, useContext, useEffect, useState } from "react";
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

}

interface FetchPhotosResponse {
  results: PhotoType[];
}

const Context = createContext<PhotosContext | null>(null) 
 




export function PhotosProvider({ children }: { children: ReactNode }) {
    
    const [results, setResults] = useState<PhotoType[]>([]);
      const [error, setError] = useState("");
      const [query, setQuery] = useState("energy");
      const [pageNo, setPageNo] = useState(1);
    
    
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




    return <Context.Provider value={{results, error }}>{children}</Context.Provider>;
    }

export function UsePhotos() {
    const value = useContext(Context);
    if (!value) {
      throw new Error("Please use this component inside PhotosProvider");
    }
    return value;
}