import { X } from "react-feather";

export const Library = ({
  songs,
  currentSong,
  handleSelect,
  isLibraryOpen,
  toggleLibrary,
}) => (
  <div className={`library ${isLibraryOpen ? "open" : ""}`}>
    <div className="library__header">
      <span className="library__text">Library</span>
      <X onClick={toggleLibrary} />
    </div>
    <div className="library__content">
      {songs.map((song, index) => (
        <div
          key={song.id}
          className={`library__song ${index === currentSong ? "active" : ""}`}
          onClick={() => handleSelect(index)}
        >
          <img className="library__song-img" src={song.cover} alt="" />
          <div className="library__song-text">
            <h2>{song.name}</h2>
            <h4>{song.artist}</h4>
          </div>
        </div>
      ))}
    </div>
  </div>
);
