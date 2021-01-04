import { useEffect, useRef, useState } from "react";
import { data } from "../../utils/data";
import { App } from "./App";

export const AppContainer = () => {
  const [songs] = useState(data);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const audioRef = useRef(null);

  const previousSong = () => {
    if (currentSong === 0) {
      handleSelect(songs.length - 1);
    } else {
      handleSelect(currentSong - 1);
    }
  };

  const nextSong = () => {
    handleSelect((currentSong + 1) % songs.length);
  };

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const handleTimeUpdate = (e) => {
    setSongInfo({
      ...songInfo,
      currentTime: e.target.currentTime,
    });
  };

  const handleLoad = (e) => {
    setSongInfo({
      ...songInfo,
      duration: e.target.duration,
    });
  };

  const handleDrag = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const handleSelect = async (index) => {
    await setCurrentSong(index);
    if (isPlaying) audioRef.current.play();
  };

  const toggleLibrary = () => {
    setIsLibraryOpen((isLibraryOpen) => !isLibraryOpen);
  };

  return (
    <App
      songs={songs}
      currentSong={currentSong}
      handleSelect={handleSelect}
      nextSong={nextSong}
      previousSong={previousSong}
      togglePlay={togglePlay}
      isPlaying={isPlaying}
      songInfo={songInfo}
      handleDrag={handleDrag}
      handleTimeUpdate={handleTimeUpdate}
      handleLoad={handleLoad}
      audioRef={audioRef}
      isLibraryOpen={isLibraryOpen}
      toggleLibrary={toggleLibrary}
    />
  );
};
