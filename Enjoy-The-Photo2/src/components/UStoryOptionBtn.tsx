import usePhotos from "../context/usePhotos";

interface Props {
    word: string;
}

function UStoryOptionBtn({ word }: Props) {
   const {setNewQuery} = usePhotos()

function handleOnClick() {
  window.scrollTo({ top: 0, behavior: "smooth" })
    setNewQuery(word)
}


  return (
    <button 
        className="btn u-story-option-btn" 
        key={word}
        onClick={handleOnClick} >
              {word}
            </button>
  )
}

export default UStoryOptionBtn