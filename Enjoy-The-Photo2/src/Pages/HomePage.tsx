import PhotosGrid from '../components/PhotosGrid'
import usePhotos from '../context/usePhotos'

const HomePage = () => {
  const {actualPhotos: photos} = usePhotos()


  return (
    <PhotosGrid photos={photos}/>
  )
}

export default HomePage