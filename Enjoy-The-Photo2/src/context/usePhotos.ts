import { useContext } from "react";
import { Context } from "./Photos";

function usePhotos() {
  const value = useContext(Context);
  if (!value) {
    throw new Error("Please use this component inside PhotosProvider");
  }
  return value;
}

export default usePhotos;
