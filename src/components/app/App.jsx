import { Library } from "../Library";
import { Nav } from "../Nav";
import { Player } from "../Player";
import { Song } from "../Song";

export const App = ({
  songs,
  currentSong,
  handleSelect,
  nextSong,
  previousSong,
  togglePlay,
  isPlaying,
  songInfo,
  handleDrag,
  handleTimeUpdate,
  handleLoad,
  audioRef,
  isLibraryOpen,
  toggleLibrary,
}) => (
  <div className="root">
    <Library
      songs={songs}
      currentSong={currentSong}
      handleSelect={handleSelect}
      isLibraryOpen={isLibraryOpen}
      toggleLibrary={toggleLibrary}
    />
    <div className={`app ${isLibraryOpen ? "with-library" : ""}`}>
      <Nav isLibraryOpen={isLibraryOpen} toggleLibrary={toggleLibrary} />
      <Song currentSong={songs[currentSong]} />
      <Player
        nextSong={nextSong}
        togglePlay={togglePlay}
        previousSong={previousSong}
        isPlaying={isPlaying}
        songInfo={songInfo}
        handleDrag={handleDrag}
        currentSong={songs[currentSong]}
      />
    </div>
    <audio
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoad}
      onEnded={nextSong}
      ref={audioRef}
      src={songs[currentSong].audio}
    ></audio>
  </div>
);
