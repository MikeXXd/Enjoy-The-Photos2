import usePhotos from "../hooks/usePhotos";
import { cc } from "../utils/cc";

const NavBar = () => {
  const { renderGallery, isGalleryRendered } = usePhotos();

  function handleGalery(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
    renderGallery();
  }

  function handleUStory(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
  }

  function handleAbout(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
  }

  function handleSetting(event: React.MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.blur();
  }

  return (
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
  );
};

export default NavBar;
