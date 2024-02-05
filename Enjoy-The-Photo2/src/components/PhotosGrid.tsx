import { useEffect } from "react";
import Photo from "../interfacesAndTypes/Photo";
import setBackgroundImage from "../services/setBackground";
import PhotoContainer from "./PhotoContainer";
import useAppSetting from "./setting/store";

interface PhotosGridProps {
  photos: Photo[];
}

const PhotosGrid = ({ photos }: PhotosGridProps) => {
  const { gridSize, isDynamicBackground } = useAppSetting();

  // dynamic-background-mechanism -----------------------------------------
  useEffect(() => {
    if (photos.length < 2 || !isDynamicBackground) return;
    setBackgroundImage(photos[1]); //[1] the second photo looks better
  }, [photos, isDynamicBackground]);

  return (
    <main className={`grid-container-masonri ${gridSize}`}>
      {photos.map((photo) => (
        <PhotoContainer key={photo.id} photo={photo} />
      ))}
    </main>
  );
};

export default PhotosGrid;
