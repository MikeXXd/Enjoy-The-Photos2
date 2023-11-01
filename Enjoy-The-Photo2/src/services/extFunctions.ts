import { PhotoType } from "../context/Photos";



export const fetchBackgroundImage = async (actualPhoto: PhotoType) => {
    let currentBackground = document.getElementById("root") as HTMLElement;
    const response = await fetch(actualPhoto.urls.regular);
    const blob = await response.blob();
    currentBackground.style.backgroundImage = `url(${URL.createObjectURL(
      blob
    )})`;
  };