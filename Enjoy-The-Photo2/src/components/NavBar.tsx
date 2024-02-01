import { NavLink } from "react-router-dom";

const NavBar = () => {

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
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
