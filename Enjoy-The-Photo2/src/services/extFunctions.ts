import { PhotoType } from "../context/Photos";



export const fetchBackgroundImage = async (photo: PhotoType) => {
    let currentBackground = document.getElementById("root") as HTMLElement;
    const response = await fetch(photo.urls.regular);
    const blob = await response.blob();
    currentBackground.style.backgroundImage = `url(${URL.createObjectURL(
      blob
    )})`;
  };