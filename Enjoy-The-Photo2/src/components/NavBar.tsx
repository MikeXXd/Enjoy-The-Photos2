import { useState } from "react";
import usePhotos from "../hooks/usePhotos";
import { cc } from "../utils/cc";
import About from "./About";
import Setting from "./Setting";
import UStoryTemporary from "./UStoryTemporary";
import Modal from "./Modal";

const NavBar = () => {
  const { renderGallery, isGalleryRendered } = usePhotos();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isUStoryModalOpen, setIsUStoryModalOpen] = useState(false);

  function handleGalery(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
    renderGallery();
  }

  function handleUStory(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
    setIsUStoryModalOpen(true);
  }

  function handleAbout(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
    setIsAboutModalOpen(true);
  }

  function handleSetting(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
    setIsSettingModalOpen(true);
  }

  return (
    <>
      <nav className="nav-bar">
        <ul>
          <li>
            <a
              href="#"
              role="button"
              onClick={handleGalery}
              className={cc(isGalleryRendered && "selected")}
            >
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
      <Modal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      >
        <About
          onClose={() => setIsAboutModalOpen(false)}
          handleUStory={() => handleUStory}
        />
      </Modal>
      <Modal
        isOpen={isSettingModalOpen}
        onClose={() => setIsSettingModalOpen(false)}
      >
        <Setting onClose={() => setIsSettingModalOpen(false)} />
      </Modal>
      <Modal
        isOpen={isUStoryModalOpen}
        onClose={() => setIsUStoryModalOpen(false)}
      >
        <UStoryTemporary onClose={() => setIsUStoryModalOpen(false)} />
      </Modal>
    </>
  );
};

export default NavBar;
