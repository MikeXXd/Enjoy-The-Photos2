import { useState } from "react";
import usePhotos from "../hooks/usePhotos";
import { cc } from "../utils/cc";
import About from "./About";
import Setting from "./Setting";
import UStoryTemporary from "./UStoryTemporary";
import Modal from "./Modal";
import { BackgroundProps } from "../App";

const NavBar = ({}) => {
  const { renderGallery, isGalleryRendered } = usePhotos();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isUStoryModalOpen, setIsUStoryModalOpen] = useState(false);

  const handleModal = (setState: React.Dispatch<React.SetStateAction<boolean>>) => () => setState(true);
  const handleCloseModal = (setState: React.Dispatch<React.SetStateAction<boolean>>) => () => setState(false);

  const NavItem = ({ label, onClick, isSelected }: { label: string, onClick: () => void, isSelected: boolean }) => (
    <li>
      <a
        href="#"
        role="button"
        onClick={onClick}
        className={cc(isSelected && "selected")}
      >
        {label}
      </a>
    </li>
  );

  return (
    <>
      <nav className="nav-bar">
        <ul>
          <NavItem label="Galery" onClick={renderGallery} isSelected={isGalleryRendered} />
          <NavItem label={"uStory"} onClick={handleModal(setIsUStoryModalOpen)} isSelected={false} />
          <NavItem label="About" onClick={handleModal(setIsAboutModalOpen)} isSelected={false} />
          <NavItem label="Setting" onClick={handleModal(setIsSettingModalOpen)} isSelected={false} />
        </ul>
      </nav>
      <Modal
        isOpen={isAboutModalOpen}
        onClose={handleCloseModal(setIsAboutModalOpen)}
      >
        <About
          onClose={handleCloseModal(setIsAboutModalOpen)}
          handleUStory={handleModal(setIsUStoryModalOpen)}
        />
      </Modal>
      <Modal
        isOpen={isSettingModalOpen}
        onClose={handleCloseModal(setIsSettingModalOpen)}
      >
        <Setting onClose={handleCloseModal(setIsSettingModalOpen)} />
      </Modal>
      <Modal
        isOpen={isUStoryModalOpen}
        onClose={handleCloseModal(setIsUStoryModalOpen)}
      >
        <UStoryTemporary onClose={handleCloseModal(setIsUStoryModalOpen)} />
      </Modal>
    </>
  );
};

export default NavBar;
