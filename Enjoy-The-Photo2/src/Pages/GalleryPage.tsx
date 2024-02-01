import PhotosGrid from '../components/PhotosGrid'
import usePhotos from '../context/usePhotos'

const GalleryPage = () => {
const {gallery: photos} = usePhotos()

  return (
    <>
    {!photos.length && <div className="information-wrap">
        <h2>Oops...</h2>
        <p>
          You have no photos in gallery</p>
    </div>}
<PhotosGrid photos={photos}/>
</>
  )
}

export default GalleryPage