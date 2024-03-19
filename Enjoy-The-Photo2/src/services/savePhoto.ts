import Photo from "../interfacesAndTypes/Photo";

export default function savePhoto(photo: Photo) {
    const photoTitle = photo.description ? photo.description : photo.alt_description ? photo.alt_description : photo.id;
    fetch(photo.urls.full)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", photoTitle + ".jpg"); 
        link.click(); 
        link.remove();
      });
  }