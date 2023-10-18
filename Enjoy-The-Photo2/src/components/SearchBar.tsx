import { MouseEvent } from "react";
import usePhotos from "../hooks/usePhotos";

const SearchBar = () => {
  const { query, setQuery, pageNo, setPageNo, actualPhotos } = usePhotos();
  // useState()
  console.log("SearchBarPageNo", pageNo)
  console.log("searchBarQuery", query)

  function handlePriorBtn(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.blur();
    console.log("ActivPRIORSearchBarPageNo", pageNo)
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
      console.log('activeSearchBar SEARCH with query', query)
      setPageNo(1);
      setQuery(inputQuery);
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  }

  function handleNextBtn(e : MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.blur();
    console.log("ActivNEXTSearchBarPageNo", pageNo)

    if (actualPhotos.length < 1) {
      setPageNo(pageNo - 1)
    }
    else {
    setPageNo(pageNo + 1)}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div  className="search-bar sticky">
      <button disabled={false} onClick={handlePriorBtn} className="btn">
        prior
      </button>
      <input
        id="inputQuery"
        type="search"
        name="photo"
        placeholder={query}
        defaultValue={query}
        aria-label="search photos"
        onKeyDown={submitQuery}
      />
      <button disabled={false} onClick={handleNextBtn} className="btn ">next</button>
    </div>
  );
};

export default SearchBar;
