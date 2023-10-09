import { useState , useEffect} from "react";
import  apiClient from '../services/api-client'
import { CanceledError } from "axios";

interface Photos {
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
}

interface fetchPhotosResponse {
  results: Photos[];
}

const UsePhotos = () => {
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<fetchPhotosResponse>("1&per_page=10&query=love",{ signal: controller.signal })
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

