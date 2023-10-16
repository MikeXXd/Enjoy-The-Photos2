import { useState } from "react";
import { PhotoType } from "../context/Photos";
import { cc } from "../utils/cc";

interface PhotoContainerProps {
  photo: PhotoType;
}

interface OrientationProps {
  cssClass: string;
  apiSize: "regular" | "small" | "full";
}

const PHOTO_ORIENTATION: OrientationProps[] = [
  { cssClass: "tall wide", apiSize: "regular" },
  { cssClass: "", apiSize: "small" },
  { cssClass: "", apiSize: "small" },
  { cssClass: "tall", apiSize: "regular" },
  { cssClass: "wide", apiSize: "regular" },
];

const PhotoContainer = ({ photo }: PhotoContainerProps) => {
  const [photoSize, setPhotoSize] = useState(
    () =>
      PHOTO_ORIENTATION[Math.floor(Math.random() * PHOTO_ORIENTATION.length)]
  );

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cc( 'img-container', 'blur-load',  photoSize.cssClass , isLoaded && 'loaded')}
      style={{ backgroundImage: `url(${photo.urls.thumb})` }}
    >
      <img
        className='img'
        src={photo.urls[photoSize.apiSize]}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default PhotoContainer;
