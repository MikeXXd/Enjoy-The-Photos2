import "./styles.css";
import PhotosGrid from "./components/PhotosGrid";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import usePhotos from "./hooks/usePhotos";
import imgTriangleUp from "./img/icons8-triangle-color-96.png";


const App = () => {
 const {actualPhotos, error} = usePhotos()

  return (
    <div className="grid-container-home">
      <div className="header-and-nav-bar">
        <span className="pre-header hide-on-small-device">
          Breath in the depth of colors and geometry, jump in and enjoooooy the{" "}
          <a href="#">Story</a>
        </span>
        <header className="header">
        <img src={imgTriangleUp} />
        <h1>Enjoy the Photos2</h1>
        </header>
        <NavBar />
      </div>
      <SearchBar />
      {error && <div className="error">{error}</div>} 
      <PhotosGrid photos={actualPhotos} />
      <footer className="footer">
        <span>
          Created by<a href="https://www.linkedin.com/in/michal-vili%C5%A1-483196251/">MikeXd</a>2023
        </span>
      </footer>
    </div>
  );
};

export default App;
