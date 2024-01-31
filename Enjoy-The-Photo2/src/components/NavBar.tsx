import { Link } from "react-router-dom";
import useApp from "../context/useApp";
import usePhotos from "../context/usePhotos";
import { cc } from "../utils/cc";
import useStories from "./uStory/store";

interface NavItemsProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const NavBar = () => {
  // const { renderGallery, isGalleryRendered, setIsGalleryRendered, gallery } =
  //   usePhotos();
  // const { uStories, setIsUStoryCreating } = useStories();
  // const {
  //   isUStoryRendered,
  //   setIsUStoryRendered,
  //   isAboutRendered,
  //   setIsAboutRendered,
  //   isSettingRendered,
  //   setIsSettingRendered,
  // } = useApp();

  // function handleGallery() {
  //   if (gallery.length) {
  //     renderGallery();
  //     setIsUStoryCreating(false);
  //     setIsUStoryRendered(false);
  //     setIsSettingRendered(false);
  //     setIsAboutRendered(false);
  //   }
  //   return;
  // }

  // function handleUStories() {
  //   if (uStories.length) {
  //     setIsUStoryCreating(false);
  //     setIsUStoryRendered(!isUStoryRendered);
  //     setIsGalleryRendered(false);
  //     setIsSettingRendered(false);
  //     setIsAboutRendered(false);
  //   }
  //   return;
  // }



  // function handleSetting() {
  //   setIsAboutRendered(false);
  //   setIsSettingRendered(!isSettingRendered);
  // }


  return (
    <>
      <nav className="nav-bar">
        <ul>
          <li>
            <Link to="/gallery" role="button">
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/youstory" role="button">
              uStory
            </Link>
          </li>
          <li>
            <Link to="/about" role="button">
              About
            </Link>
          </li>
          <li>
            <Link to="/setting" role="button">
              Setting
            </Link>
          </li>
          {/*
          <NavItem
            label="Gallery"
            onClick={handleGallery}
            isSelected={
              !isSettingRendered && !isAboutRendered && isGalleryRendered
            }
          />
          <NavItem
            label="uStories"
            onClick={handleUStories}
            isSelected={
              !isSettingRendered && !isAboutRendered && isUStoryRendered
            }
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
          /> */}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
