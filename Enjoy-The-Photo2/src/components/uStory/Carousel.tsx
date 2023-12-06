import Flickity from "react-flickity-component";
import { UStoryType } from "../../App";
import "./flickity.css";


interface Props {
    story: UStoryType
}


export default function Carousel({story}: Props) {


    const flickityOptions = {
        initialIndex: 1,
        autoPlay: true,
        prevNextButtons: false,
        accessibility: true,
        cellAlign: 'center',
        contain: true,
        percentPosition: false,
        pageDots: true,
        fullscreen: true,
    };
    
    if (story.body.length < 4) {
        flickityOptions.autoPlay = false;
        
    }

  return (


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

  )
}

