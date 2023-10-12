import "./styles.css";
// import UsePhotos from "./hooks/UseFetch";
// import { useState } from "react";
import PhotosGrid from "./components/PhotosGrid";
// import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import { UsePhotos } from "./context/Photos";

// const DEFAULT_QUERY = "energy";
// const DEFAULT_PAGE_NO = 2;

const App = () => {
  // const [pageNo, setPageNo] = useState(DEFAULT_PAGE_NO);
  // const [query, setQuery] = useState(DEFAULT_QUERY);
 const {results, error} = UsePhotos()
  // const { photos, error } = UsePhotos({ pageNo, query });

  console.log("photos", results);
  console.log("error", error);

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
      {/* <SearchBar  query={query} /> */}
      <PhotosGrid photos={results} />
      <footer className="footer">
        <span>
          Created by <a href="#">MikeXd</a> 2023
        </span>
      </footer>
    </div>
  );
};

export default App;
