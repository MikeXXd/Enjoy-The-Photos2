import usePhotos from "../hooks/usePhotos"

const NavBar = () => {
  const {renderGalery} = usePhotos()

  return (
    <nav className="nav-bar">
          <ul>
            <li>
              <a href="#" role="button" onClick={renderGalery}>Galery</a>
            </li>
            <li>
              <a href="#" role="button"><em>u</em>Story</a>
            </li>
            <li>
              <a href="#" role="button">About</a>
            </li>
            <li>
              <a href="#" role="button">Setting</a>
            </li>
          </ul>
        </nav>
  )
}


export default NavBar