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
  const { renderGallery, isGalleryRendered, setIsGalleryRendered, gallery } =
    usePhotos();
  const { uStories, setIsUStoryCreating } = useStories();
  const {
    isUStoryRendered,
    setIsUStoryRendered,
    isAboutRendered,
    setIsAboutRendered,
    isSettingRendered,
    setIsSettingRendered,
  } = useApp();

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
    if (uStories.length) {
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
          />
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
