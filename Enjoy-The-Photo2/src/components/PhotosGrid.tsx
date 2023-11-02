import useApp from "../context/useApp";
import usePhotos from "../context/usePhotos";
import PhotoContainer from "./PhotoContainer";

const PhotosGrid = () => {
  const { actualPhotos } = usePhotos();
  const { gridSize } = useApp();
  
  return (
    <main className={`grid-container-masonri ${gridSize}`} >
      {actualPhotos.map((photo) => (
        <PhotoContainer key={photo.id} photo={photo} />
      ))}
    </main>
  );
};

export default PhotosGrid;
