import { useState , useEffect} from "react";
import  apiClient from '../services/api-client'
import { CanceledError } from "axios";

export interface Photo {
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

interface UsePhotosProps {
  pageNo: number;
  query: string;
}

interface FetchPhotosResponse {
  results: Photo[];
}

const UsePhotos = ({pageNo, query}: UsePhotosProps) => {

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {


    const controller = new AbortController();
    apiClient
      .get<FetchPhotosResponse>(`photos?page=${pageNo}&per_page=31&query=${query}`,{ signal: controller.signal })
      .then((res) => setPhotos(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { photos, error };
}
export default UsePhotos;

