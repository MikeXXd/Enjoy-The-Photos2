import usePhotos from "../context/usePhotos";

interface Props {
    word: string;
}

function UStoryOptionBtn({ word }: Props) {
   const {setNewQuery} = usePhotos()
  return (
    <button 
        className="btn u-story-option-btn" 
        key={word}
        onClick={() => setNewQuery(word)} >
              {word}
            </button>
  )
}

export default UStoryOptionBtn