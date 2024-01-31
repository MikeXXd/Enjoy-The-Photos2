import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import useApp from "../context/useApp";
import usePhotos from "../context/usePhotos";
import { cc } from "../utils/cc";
import useAppSetting from "./setting/store";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const {
    query,
    setNewQuery,
    pageNo,
    setPageNo,
    actualPhotos,
    isGalleryRendered,
  } = usePhotos();
  const { isUStoryRendered, setIsUStoryRendered } = useApp();
 const {isSearchBarSticky} = useAppSetting()
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);
  const [isPriorBtnActive, setIsPriorBtnActive] = useState(pageNo > 1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate()

  useEffect(() => {
    if (inputRef.current === null) return;
    inputRef.current.value = query;
  }, [query]);

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

  function handleEntries(
    e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    e.currentTarget.blur();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
    isUStoryRendered && setIsUStoryRendered(false);
  }

  function handlePriorBtn(e: MouseEvent<HTMLButtonElement>) {
    handleEntries(e);
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    } else {
      setIsPriorBtnActive(false);
    }
  }

  function submitQuery(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const inputQuery = e.currentTarget.value;
      setNewQuery(inputQuery);
      handleEntries(e);
    }
  }

  function handleNextBtn(e: MouseEvent<HTMLButtonElement>) {
    handleEntries(e);
    if (actualPhotos.length < 1) {
      setPageNo(pageNo - 1);
    } else {
      setPageNo(pageNo + 1);
    }
  }

  return (
    <div className={cc("search-bar", isSearchBarSticky && "sticky")}>
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
        ref={inputRef}
        placeholder={query}
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
}
