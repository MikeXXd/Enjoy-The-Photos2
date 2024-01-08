import { PhotoType } from "../context/Photos";

export const setBackgroundImage = async (photo: PhotoType | string) => {
  const source = typeof photo === "string" ? photo : photo.urls.regular;
  let HTMLBase = document.getElementById("root") as HTMLElement;
  const response = await fetch(source);
  const blob = await response.blob();
  HTMLBase.style.backgroundImage = `url(${URL.createObjectURL(blob)})`;
};
