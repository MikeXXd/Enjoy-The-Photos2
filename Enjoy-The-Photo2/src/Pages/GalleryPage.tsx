import PhotosGrid from '../components/PhotosGrid'
import usePhotos from '../context/usePhotos'

const GalleryPage = () => {
const {gallery: photos} = usePhotos()

  return (
<PhotosGrid photos={photos}/>
  )
}

export default GalleryPage