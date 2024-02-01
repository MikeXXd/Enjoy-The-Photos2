import PhotosGrid from '../components/PhotosGrid'
import usePhotos from '../context/usePhotos'

const HomePage = () => {
  const {actualPhotos: photos, error} = usePhotos()


  return (

    <>
    {error && <div className="error-wrap">
        <h1>Oops...</h1>
        <p>
          {error}
        </p>
    </div>}
    <PhotosGrid photos={photos}/></>
  )
}

export default HomePage