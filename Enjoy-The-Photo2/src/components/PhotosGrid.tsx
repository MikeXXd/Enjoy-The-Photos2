import { useEffect } from "react";
import { PhotoType } from "../context/Photos";
import setBackgroundImage from "../services/extFunctions";
import PhotoContainer from "./PhotoContainer";
import useAppSetting from "./setting/store";

interface PhotosGridProps {
  photos: PhotoType[];
}

const PhotosGrid = ({photos}: PhotosGridProps) => {
  const { gridSize, isDynamicBackground } = useAppSetting();
  
  // dynamic-background-mechanism -----------------------------------------
  useEffect(() => {
    if (photos.length < 2 || !isDynamicBackground) return;
    setBackgroundImage(photos[1]); //[1] the second photo looks better
  }, [photos, isDynamicBackground]);

  
  return (
    <main className={`grid-container-masonri ${gridSize}`} >
      {photos.map((photo) => (
        <PhotoContainer key={photo.id} photo={photo} />
      ))}
    </main>
  );
};

export default PhotosGrid;
