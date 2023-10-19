import { MouseEvent, useEffect, useState } from "react";
import usePhotos from "../hooks/usePhotos";
import { cc } from "../utils/cc";

const SearchBar = () => {
  const { query, setQuery, pageNo, setPageNo, actualPhotos, isGalleryRendered } = usePhotos();
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);
  const [isPriorBtnActive, setIsPriorBtnActive] = useState(pageNo > 1);

  console.log("SearchBarPageNo", pageNo);
  console.log("searchBarQuery", query);

  useEffect(() => {
    if (pageNo > 1) {
      setIsPriorBtnActive(true);
    } else {
      setIsPriorBtnActive(false);
    }
  }, [pageNo]);

  
  useEffect(() => {
    if (!isGalleryRendered && actualPhotos.length < 30) {
      setIsNextBtnDisabled(true);
    } else {
      setIsNextBtnDisabled(false);
    }
  }, [actualPhotos, isGalleryRendered]);

  function handlePriorBtn(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.blur();
    console.log("ActivPRIORSearchBarPageNo", pageNo);
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsPriorBtnActive(false);
    }
    // pokračovaní HERE----!!!!!!!!!!!!!!!!!!
  }

  function submitQuery(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
      const inputQuery = e.currentTarget.value;
      console.log("activeSearchBar SEARCH with query", query);
      setPageNo(1);
      setQuery(inputQuery);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleNextBtn(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.blur();
    console.log("ActivNEXTSearchBarPageNo", pageNo);

    if (actualPhotos.length < 1) {
      setPageNo(pageNo - 1);
    } else {
      setPageNo(pageNo + 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="search-bar sticky">
      <button
        disabled={false}
        onClick={handlePriorBtn}
        className={cc("btn", isPriorBtnActive || "btn-disabled")}
      >
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
      <button
        disabled={isNextBtnDisabled}
        onClick={handleNextBtn}
        className={cc("btn", isNextBtnDisabled && "btn-disabled")}
      >
        next
      </button>
    </div>
  );
};

export default SearchBar;
