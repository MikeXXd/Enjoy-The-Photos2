import "./styles.css";
import UsePhotos from "./hooks/UsePhotos";
import { useState } from "react";
import PhotosGrid from "./components/PhotosGrid";

const DEFAULT_QUERY = 'space';
const DEFAULT_PAGE_NO = 2;

const App = () => {
  const [pageNo, setPageNo] = useState(DEFAULT_PAGE_NO)
  const [query, setQuery] = useState(DEFAULT_QUERY)

  const { photos, error } = UsePhotos({ pageNo, query });

  console.log("photos" ,photos);


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
        <nav className="nav-bar">
          <ul>
            <li>
              <a href="#">Galery</a>
            </li>
            <li>
              <a href="#"><em>u</em>Story</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Setting</a>
            </li>
          </ul>
        </nav>
      </div>
      <section className="search-bar sticky">
        <button className="btn">previous</button>
        <input type="text" />
        <button className="btn ">Search</button>
        <button className="btn ">next</button>
      </section>
      <PhotosGrid photos={photos} />
      <footer className="footer">
        <span>
          Created by <a href="#">MikeXd</a> 2023
        </span>
      </footer>
    </div>
  );
};

export default App;
