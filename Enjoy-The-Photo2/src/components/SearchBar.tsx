import { useState } from "react"

interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void;
}                      

const SearchBar = ({query, setQuery}: SearchBarProps) => {

    const [search, setSearch]= useState("Search Photos")

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar sticky">
        {/* <button className="btn">previous</button> */}
        <input 
              id="inputQuery"
              type="text"
              name="photo"
              placeholder={search}
            onChange={(e) => setQuery(e.target.value)}
            value={search}
              aria-label="search photos" />
        <button className="btn ">Search</button>
        {/* <button className="btn ">next</button> */}
      </form>
  )
}

export default SearchBar