import { useState } from "react";
import usePhotos from "../hooks/usePhotos";
import { cc } from "../utils/cc";
import { CustomModal } from "./CustomModal";

const NavBar = () => {
  const { renderGallery, isGalleryRendered } = usePhotos();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);


  function handleGalery(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
    renderGallery();
  }

  function handleUStory(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
  }

  function handleAbout(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
    setIsAboutModalOpen(true);
  }

  function handleSetting(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
  }

  return (
    <>
    <nav className="nav-bar">
      <ul>
        <li>
          <a href="#" role="button" onClick={handleGalery} className={cc(isGalleryRendered && 'selected')}>
            Galery
          </a>
        </li>
        <li>
          <a href="#" role="button" onClick={handleUStory}>
            <em>u</em>Story
          </a>
        </li>
        <li>
          <a href="#" role="button" onClick={handleAbout}>
            About
          </a>
        </li>
        <li>
          <a href="#" role="button" onClick={handleSetting}>
            Setting
          </a>
        </li>
      </ul>
    </nav>
    <CustomModal
    isOpen={isAboutModalOpen}
    onClose={() => setIsAboutModalOpen(false)}
  >
    <button onClick={() => setIsAboutModalOpen(false)} >Close</button>
    <img
      src='https://images.unsplash.com/photo-1501761095094-94d36f57edbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MTM0MTl8MHwxfHNlYXJjaHwxMXx8d2F0ZXJmYWxsfGVufDB8fHx8MTY5ODI2NTIxOHww&ixlib=rb-4.0.3&q=85'
      
    />
    <h4>we are creators, MIGHTY CREATORS, unaware of our power and having no clear instruction how to use it, still even we use a fraction of it is more then enought to harm ourselves and others beings. we are more then just what we thing we are and more we know who we are the BETTER LIFE enjoy the photos and KNOW THYSELF. You Create the <a role="button" onClick={handleUStory} ><em>u</em>Story</a></h4>
  </CustomModal>
    </>
  );
};

export default NavBar;
