import Flickity from "react-flickity-component";
import { UStoryType } from "../../App";
import "./flickity.css";
import useApp from "../../context/useApp";
import { cc } from "../../utils/cc";
import { useState } from "react";

interface Props {
  story: UStoryType;
}

export default function Carousel({ story }: Props) {
  const { changeUStoryTitle, deleteUStory } = useApp();
  const [haveTitle, setHaveTitle] = useState(false);

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
    setGallerySize: true,
  }; // bound to flickity.css

  function handleStoryTitle() {
    const newTitle = prompt("Enter new title");
    if (newTitle) {
      changeUStoryTitle({ id: story.id, name: newTitle });
    }
  }

  function handleStorydelete() {
    if (window.confirm("Do you really want to DELETE ! this uStory?"))
      deleteUStory({ id: story.id });
  }

  if (story.body.length < 4) {
    flickityOptions.autoPlay = false;
  }

  return (
    <>
      <div
        className="ustory-btn ustory-delete-btn"
        onClick={() => handleStorydelete()}
      >
        X
      </div>
      <div
        className="ustory-btn ustory-title-btn"
        onClick={() => handleStoryTitle()}
      >
        {story.name}
      </div>
      <Flickity
        className="carousel" // default ''
        elementType="div" // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate // default false
        static // default false
      >
        {story.body.map((photo) => (
          <div
            className={cc("ustory-photo-container", haveTitle && "show-title")}
            onClick={() => console.log("Clicked on", photo.id)}
            data-img={photo.photoQueryName}
          >
            <img
              className="ustory-img "
              key={photo.id}
              src={photo.urls.small}
              alt={photo.alt_description}
            />
            {/* <div className="ustory-photo-title">{photo.alt_description}</div> */}
          </div>
        ))}
      </Flickity>
    </>
  );
}
