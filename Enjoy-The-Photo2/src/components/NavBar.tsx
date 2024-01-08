import { useState, Dispatch, SetStateAction } from "react";
import usePhotos from "../context/usePhotos";
import { cc } from "../utils/cc";
// import About from "./About";
import Setting from "./setting/Setting";
import Modal from "./Modal";
import useApp from "../context/useApp";
import { set } from "react-hook-form";

interface NavItemsProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const NavBar = () => {
  const { renderGallery, isGalleryRendered, setIsGalleryRendered, gallery } =
    usePhotos();
  const { setIsUStoryCreating, isUStoryRendered, setIsUStoryRendered, uStory, isAboutRendered, setIsAboutRendered,
    isSettingRendered, setIsSettingRendered} =
    useApp();

  function handleGallery() {
    if (gallery.length) {
      renderGallery();
      setIsUStoryCreating(false);
      setIsUStoryRendered(false);
      setIsSettingRendered(false);
      setIsAboutRendered(false);
    }
    return;
  }

  function handleUStories() {
    if (uStory.length) {
      setIsUStoryCreating(false);
      setIsUStoryRendered(!isUStoryRendered);
      setIsGalleryRendered(false);
      setIsSettingRendered(false);
      setIsAboutRendered(false);
    }
    return;
  }

  function handleAbout() {
    setIsSettingRendered(false);
    setIsAboutRendered(!isAboutRendered);
  }

  function handleSetting() {
    setIsAboutRendered(false);
    setIsSettingRendered(!isSettingRendered);
  }

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
            label="Gallery"
            onClick={handleGallery}
            isSelected={!isSettingRendered && !isAboutRendered && isGalleryRendered}
          />
          <NavItem
            label="uStories"
            onClick={handleUStories}
            isSelected={!isSettingRendered && !isAboutRendered && isUStoryRendered}
          />
          <NavItem
            label="About"
            onClick={handleAbout}
            isSelected={isAboutRendered}
          />
          <NavItem
            label="Setting"
            onClick={handleSetting}
            isSelected={isSettingRendered}
          />
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
