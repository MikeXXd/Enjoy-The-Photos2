import "./styles.css";
// import UsePhotos from "./hooks/UseFetch";
// import { useState } from "react";
import PhotosGrid from "./components/PhotosGrid";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import usePhotos from "./hooks/usePhotos";


const App = () => {
 const {results, error} = usePhotos()

  // console.log("photos", results);
  // console.log("error", error);

  return (
    <div className="grid-container-home">
      <div className="header-and-nav-bar">
        <span className="pre-header hide-on-small-device">
          Breath in the depth of colors and geometry, jump in and enjoooooy the{" "}
          <a href="#">Story</a>
        </span>
        <header className="header">
          <h1>Enjoy the Photos2</h1>
        </header>
        <NavBar />
      </div>
      <SearchBar />
      {error && <div className="error">{error}</div>} 
      <PhotosGrid photos={results} />
      <footer className="footer">
        <span>
          Created by<a href="#">MikeXd</a>2023
        </span>
      </footer>
    </div>
  );
};

export default App;
