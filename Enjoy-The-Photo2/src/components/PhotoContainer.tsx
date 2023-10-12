import { useState } from "react";
import { PhotoType } from "../context/Photos";

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

  return (
    <div
      className={`img-container ${photoSize.cssClass}`}
      style={{ backgroundImage: `url(${photo.urls.thumb})` }}
    >
      <img className="img" src={photo.urls[photoSize.apiSize]} />
    </div>
  );
};

export default PhotoContainer;
