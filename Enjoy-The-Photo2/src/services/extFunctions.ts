import { PhotoType } from "../context/Photos";

const setBackgroundImage = async (photo: PhotoType | string) => {
  const source = typeof photo === "string" ? photo : photo.urls.regular;
  let HTMLElement = document.getElementById("root") as HTMLElement;
  const response = await fetch(source);
  const blob = await response.blob();
  HTMLElement.style.backgroundImage = `url(${URL.createObjectURL(blob)})`;
};

export default setBackgroundImage;
