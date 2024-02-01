import PhotosGrid from "../components/PhotosGrid";
import ErrorMessage from "../components/messages/ErrorMessage";
import InformationMessage from "../components/messages/InfoMessage";
import usePhotos from "../context/usePhotos";

const HomePage = () => {
  const { actualPhotos: photos, error } = usePhotos();

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!photos.length && (
        <InformationMessage>
          Notting found try another word/s.{" "}
        </InformationMessage>
      )}
      <PhotosGrid photos={photos} />
    </>
  );
};

export default HomePage;
