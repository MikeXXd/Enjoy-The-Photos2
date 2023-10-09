import "./styles.css";
import UsePhotos from "./hooks/UsePhotos";


const App = () => {
  const { photos, error }  = UsePhotos();
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
      <main className="grid-container-masonri">
       {photos.map((photo) => (
        <div className="img-container tall wide">
        <img className="img " src={photo.urls.regular} />
      </div>
       ))}
      </main>
      <footer className="footer">
        <span>
          Created by <a href="#">MikeXd</a> 2023
        </span>
      </footer>
    </div>
  );
};

export default App;
