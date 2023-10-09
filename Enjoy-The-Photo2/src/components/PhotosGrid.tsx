import { Photo } from "../hooks/UsePhotos";
import PhotoContainer from "./PhotoContainer";

interface PhotosGridProps {
  photos: Photo[];
}

const PhotosGrid = ({ photos }: PhotosGridProps) => {




  return (
    <main className="grid-container-masonri">
       {photos.map((photo) => (
        <PhotoContainer key={photo.id} photo={photo} />
       ))}
      </main>
  )
}

export default PhotosGrid