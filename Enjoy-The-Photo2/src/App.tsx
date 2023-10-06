import "./styles.css";

const App = () => {
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
        <div className="img-container tall">
          <img className="img " src="https://source.unsplash.com/cssvEZacHvQ" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/oR0uERTVyD0" />
        </div>
        <div className="img-container wide">
          <img className="img " src="https://source.unsplash.com/01_igFr7hd4" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/O-8Fmpx7HqQ" />
        </div>
        <div className="img-container wide">
          <img className="img " src="https://source.unsplash.com/cfQEO_1S0Rs" />
        </div>
        <div className="img-container tall">
          <img className="img " src="https://source.unsplash.com/FpATXvTxEI4" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/uf4oyaimWwg" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/EwKXn5CapA4" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/rTZW4f02zY8" />
        </div>
        <div className="img-container wide tall">
          <img className="img " src="https://source.unsplash.com/vltMzn0jqsA" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/aQOe0Ri267U" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/rMmibFe4czY" />
        </div>
        <div className="img-container tall">
          <img className="img " src="https://source.unsplash.com/-Bq3TeSBRdE" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/IicyiaPYGGI" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/jR4Zf-riEjI" />
        </div>
        <div className="img-container wide tall ">
          <img className="img " src="https://source.unsplash.com/IJ25m7fXqtk" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/eOpewngf68w" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/h54G2wyDadc" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/_aVKjJhFdn0" />
        </div>
        <div className="img-container">
          <img className="img" src="https://source.unsplash.com/uaJLLOhY2yU" />
        </div>
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
