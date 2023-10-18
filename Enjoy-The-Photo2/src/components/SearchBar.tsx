import { MouseEvent } from "react";
import usePhotos from "../hooks/usePhotos";

const SearchBar = () => {
  const { query, setQuery, pageNo, setPageNo, results } = usePhotos();
  console.log("pageNo", pageNo)
  console.log("query", query)

  function handlePriorBtn(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.blur();
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else return null;
  }

  function submitQuery(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
      const inputQuery = e.currentTarget.value;
      setPageNo(1);
      setQuery(inputQuery);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleNextBtn(e : MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.blur();
    if (results.length < 30) {
      return null;
    }
    setPageNo(pageNo + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div  className="search-bar sticky">
      <button onClick={handlePriorBtn} className="btn">
        prior
      </button>
      {/* <form onSubmit={handleSubmit}> */}
      <input
        id="inputQuery"
        type="search"
        name="photo"
        placeholder={query}
        defaultValue={query}
        aria-label="search photos"
        onKeyDown={submitQuery}
      />
      {/* </form> */}
      <button onClick={handleNextBtn} className="btn ">next</button>
    </div>
  );
};

export default SearchBar;
