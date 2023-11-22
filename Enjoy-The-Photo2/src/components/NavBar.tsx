import { useState, Dispatch, SetStateAction } from "react";
import usePhotos from "../context/usePhotos";
import { cc } from "../utils/cc";
import About from "./About";
import Setting from "./setting/Setting";
import UStoryTemporary from "./UStoryTemporary";
import Modal from "./Modal";
import useApp from "../context/useApp";

interface NavItemsProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const NavBar = ({}) => {
  const { renderGallery, isGalleryRendered } = usePhotos();
   const {setIsUStoryCreating} = useApp()
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isUStoryModalOpen, setIsUStoryModalOpen] = useState(false);

  // console.log('NavBar Rendered')

  const handleModal = (setState: Dispatch<SetStateAction<boolean>>) => () =>
    setState(true);
  const handleCloseModal =
    (setState: Dispatch<SetStateAction<boolean>>) => () =>
      setState(false);

  const NavItem = ({ label, onClick, isSelected }: NavItemsProps) => (
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
          <NavItem
            label="Galery"
            onClick={() => {renderGallery(); setIsUStoryCreating(false)}}
            isSelected={isGalleryRendered}
          />
          <NavItem
            label={"uStory"}
            onClick={handleModal(setIsUStoryModalOpen)}
            isSelected={false}
          />
          <NavItem
            label="About"
            onClick={handleModal(setIsAboutModalOpen)}
            isSelected={false}
          />
          <NavItem
            label="Setting"
            onClick={handleModal(setIsSettingModalOpen)}
            isSelected={false}
          />
        </ul>
      </nav>
      <Modal
        isOpen={isAboutModalOpen}
        onClose={handleCloseModal(setIsAboutModalOpen)}
      >
        <About
          onClose={handleCloseModal(setIsAboutModalOpen)}
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
