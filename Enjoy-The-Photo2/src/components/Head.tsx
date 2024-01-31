import Header from "./Header";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

const Head = () => {
  return (
    <>
      <div className="header-and-nav-bar">
        <Header />
        <NavBar />
      </div>
      <SearchBar />
    </>
  );
};

export default Head;
