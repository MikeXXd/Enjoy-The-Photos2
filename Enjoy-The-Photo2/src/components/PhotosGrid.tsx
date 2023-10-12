import { PhotoType } from "../context/Photos";
import PhotoContainer from "./PhotoContainer";

interface PhotosGridProps {
  photos: PhotoType[];
}

const PhotosGrid = ({ photos }: PhotosGridProps) => {
  return (
    <main className="grid-container-masonri">
      {photos.map((photo) => (
        <PhotoContainer key={photo.id} photo={photo} />
      ))}
    </main>
  );
};

export default PhotosGrid;
