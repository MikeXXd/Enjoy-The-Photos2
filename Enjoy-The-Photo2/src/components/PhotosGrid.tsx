import usePhotos from "../context/usePhotos";
import PhotoContainer from "./PhotoContainer";

const PhotosGrid = () => {
  const { actualPhotos } = usePhotos();
  return (
    <main className="grid-container-masonri" >
      {actualPhotos.map((photo) => (
        <PhotoContainer key={photo.id} photo={photo} />
      ))}
    </main>
  );
};

export default PhotosGrid;
