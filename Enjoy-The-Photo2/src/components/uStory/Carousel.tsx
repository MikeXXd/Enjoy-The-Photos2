import Flickity from "react-flickity-component";
import { UStoryType } from "../../App";
import "./flickity.css";
import useApp from "../../context/useApp";

interface Props {
  story: UStoryType;
}

export default function Carousel({ story }: Props) {
  const { changeUStoryTitle, deleteUStory } = useApp();

  const flickityOptions = {
    initialIndex: 1,
    autoPlay: true,
    prevNextButtons: false,
    accessibility: true,
    cellAlign: "center",
    contain: true,
    percentPosition: false,
    pageDots: true,
    fullscreen: true,
  };

  function handleStoryTitle() {
    const newTitle = prompt("Enter new title");
    if (newTitle) {
     changeUStoryTitle({id: story.id, name: newTitle});
    }
  }

  function handleStorydelete() {
    if (window.confirm("Do you really want to DELETE ! youStory?"))
    deleteUStory({id: story.id});
  }

  if (story.body.length < 4) {
    flickityOptions.autoPlay = false;
  }

  return (
    <>
    <div className="uStory-delete-btn" onClick={()=> handleStorydelete()}>X</div>
    <div className="uStory-title" onClick={()=> handleStoryTitle()}>{story.name}</div>
    <Flickity
      className="carousel" // default ''
      elementType="div" // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static // default false
    >
      {story.body.map((photo) => (
        <img
          className="ustory-photo"
          key={photo.id}
          src={photo.urls.small}
          alt={photo.alt_description}
        />
      ))}
    </Flickity>
    </>
  );
}
