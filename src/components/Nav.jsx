import { X, Music } from "react-feather";

export const Nav = ({ isLibraryOpen, toggleLibrary }) => (
  <nav className="nav">
    <h1 className="nav__text">Myoozikh</h1>
    <div className="nav__button" onClick={toggleLibrary}>
      <span className="nav__button--text">Library</span>
      <span className="nav__button--icon">
        {isLibraryOpen ? <X /> : <Music />}
      </span>
    </div>
  </nav>
);
