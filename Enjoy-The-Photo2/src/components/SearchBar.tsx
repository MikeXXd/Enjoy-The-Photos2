import { FormEvent, MouseEvent } from "react";
import { UsePhotos } from "../context/Photos";

const SearchBar = () => {
  const { query, setQuery, pageNo, setPageNo, results } = UsePhotos();
  console.log("pageNo", pageNo)
  console.log("query", query)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    (e.currentTarget.elements[0] as HTMLInputElement).blur();
    setPageNo(1);
    setQuery((e.currentTarget.elements[0] as HTMLInputElement).value);
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  function handlePriorBtn(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.blur();
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else return null;
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
      <form onSubmit={handleSubmit}>
      <input
        id="inputQuery"
        type="search"
        name="photo"
        placeholder={query}
        defaultValue={query}
        aria-label="search photos"
      />
      </form>
      <button onClick={handleNextBtn} className="btn ">next</button>
    </div>
  );
};

export default SearchBar;
