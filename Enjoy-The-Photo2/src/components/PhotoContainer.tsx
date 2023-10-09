import { useState } from "react";
import { Photo } from "../hooks/UsePhotos"


interface PhotoContainerProps{
    photo: Photo;
}

interface OrientationProps {
    option: string;
    apiSize: "regular" | "small" | "full";
  }

const PHOTO_ORIENTATION: OrientationProps[] = [
    { option: "tall wide", apiSize: "regular" },
    { option: "", apiSize: "small" },
    { option: "", apiSize: "small" },
    { option: "tall", apiSize: "regular" },
    { option: "wide", apiSize: "regular" },
  ];

const PhotoContainer = ({photo}: PhotoContainerProps ) => {

    const [photoOrientation, setPhotoOrientation] = useState(() => PHOTO_ORIENTATION[Math.floor(Math.random() * PHOTO_ORIENTATION.length)]);

     

    return (
        <div className={`img-container ${photoOrientation.option}`}>
                <img className="img" src={photo.urls[photoOrientation.apiSize]} />
            </div>
             )
    
}

export default PhotoContainer;

