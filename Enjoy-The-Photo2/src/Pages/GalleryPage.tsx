import PhotosGrid from "../components/PhotosGrid";
import useGallery from "../components/gallery/store";
import InformationMessage from "../components/messages/InfoMessage";

const GalleryPage = () => {
  const { gallery } = useGallery();

  return (
    <>
      {!gallery.length && (
        <InformationMessage>You have no photos in gallery</InformationMessage>
      )}
      <PhotosGrid photos={gallery} />
    </>
  );
};

export default GalleryPage;
