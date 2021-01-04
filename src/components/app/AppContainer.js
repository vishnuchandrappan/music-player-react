import { useCallback, useEffect, useRef, useState } from "react";
import { data } from "../../utils/data";
import { App } from "./App";
import Hammer from "hammerjs";

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
  const appRef = useRef(null);

  const handleSelect = useCallback(
    async (index) => {
      await setCurrentSong(index);
      if (isPlaying) audioRef.current.play();
    },
    [isPlaying]
  );

  const previousSong = useCallback(() => {
    if (currentSong === 0) {
      handleSelect(songs.length - 1);
    } else {
      handleSelect(currentSong - 1);
    }
  }, [handleSelect, currentSong, songs]);

  const nextSong = useCallback(() => {
    handleSelect((currentSong + 1) % songs.length);
  }, [currentSong, handleSelect, songs]);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  const toggleLibrary = useCallback(() => {
    setIsLibraryOpen((isLibraryOpen) => !isLibraryOpen);
  }, [setIsLibraryOpen]);

  const setCurrentTime = useCallback(
    (time) => {
      audioRef.current.currentTime = time;
      setSongInfo({
        ...songInfo,
        currentTime: time,
      });
    },
    [setSongInfo, songInfo]
  );

  useEffect(() => {
    const hammerTime = new Hammer(appRef.current);
    hammerTime.on("swipeleft", (_e) => {
      nextSong();
    });

    hammerTime.on("swiperight", (_e) => {
      previousSong();
    });
  }, [nextSong, previousSong]);

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
    setCurrentTime(e.target.value);
  };

  return (
    <div ref={appRef}>
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
    </div>
  );
};
