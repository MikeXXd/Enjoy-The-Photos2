import { Link, NavLink } from "react-router-dom";
import useApp from "../context/useApp";
import usePhotos from "../context/usePhotos";
import { cc } from "../utils/cc";
import useStories from "./uStory/store";

// interface NavItemsProps {
//   label: string;
//   onClick: () => void;
//   isSelected: boolean;
// }

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
            <NavLink id="link" to="/gallery" className={({isActive}) => isActive ? 'nav active ' : 'nav'} role="button">
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink id="link" to="/youstory" className={({isActive}) => isActive ? 'nav active ' : 'nav'} role="button">
              uStory
            </NavLink>
          </li>
          <li>
            <NavLink id="link" to="/about" className={({isActive}) => isActive ? 'nav active ' : 'nav'} role="button">
              About
            </NavLink>
          </li>
          <li>
            <NavLink id="link" to="/setting" className={({isActive}) => isActive ? 'nav active ' : 'nav'} role="button">
              Setting
            </NavLink>
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
