import usePhotos from "../context/usePhotos";
import PhotoContainer from "./PhotoContainer";
import useAppSetting from "./setting/store";

const PhotosGrid = () => {
  const { actualPhotos } = usePhotos();
  const { gridSize } = useAppSetting();
  
  // console.log('PhotosGrid Rendered')
  
  return (
    <main className={`grid-container-masonri ${gridSize}`} >
      {actualPhotos.map((photo) => (
        <PhotoContainer key={photo.id} photo={photo} />
      ))}
    </main>
  );
};

export default PhotosGrid;
