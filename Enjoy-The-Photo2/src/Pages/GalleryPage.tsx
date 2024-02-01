import PhotosGrid from "../components/PhotosGrid";
import InformationMessage from "../components/messages/InfoMessage";
import usePhotos from "../context/usePhotos";

const GalleryPage = () => {
  const { gallery: photos } = usePhotos();

  return (
    <>
      {!photos.length && (
        <InformationMessage>You have no photos in gallery</InformationMessage>
      )}
      <PhotosGrid photos={photos} />
    </>
  );
};

export default GalleryPage;
