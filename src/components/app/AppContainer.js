import { useCallback, useEffect, useRef, useState } from "react";
import { data } from "../../utils/data";
import { App } from "./App";
import Hammer from "hammerjs";

export const AppContainer = () => {
  // list of songs
  const [songs] = useState(data);

  // currently playing song's index
  const [currentSong, setCurrentSong] = useState(0);

  // play or pause ?
  const [isPlaying, setIsPlaying] = useState(false);

  // song info currentTime and total duration
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  // bool to check if library is open
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  /**
   * audioRef for handling <audio></audio> tag
   * appRef for hammerjs, handling swipes
   */
  const audioRef = useRef(null);
  const appRef = useRef(null);

  /**
   * @input index integer
   * used in library to select songs
   */
  const handleSelect = useCallback(
    async (index) => {
      await setCurrentSong(index);
      if (isPlaying) audioRef.current.play();
    },
    [isPlaying]
  );

  // for changing to previous song.
  const previousSong = useCallback(() => {
    if (currentSong === 0) {
      handleSelect(songs.length - 1);
    } else {
      handleSelect(currentSong - 1);
    }
  }, [handleSelect, currentSong, songs]);

  // for changing to next song
  const nextSong = useCallback(() => {
    handleSelect((currentSong + 1) % songs.length);
  }, [currentSong, handleSelect, songs]);

  /**
   * Checks for isPlaying
   * when its value is changed, handles audioRef's play and pause
   */
  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  // show and hide library
  const toggleLibrary = useCallback(() => {
    setIsLibraryOpen((isLibraryOpen) => !isLibraryOpen);
  }, [setIsLibraryOpen]);

  // for seek functionality
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

  /**
   * hammerjs swipe implementation
   */
  useEffect(() => {
    const hammerTime = new Hammer(appRef.current);
    hammerTime.on("swipeleft", (_e) => {
      nextSong();
    });

    hammerTime.on("swiperight", (_e) => {
      previousSong();
    });
  }, [nextSong, previousSong]);

  // change play => pause and vice-versa
  const togglePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  // updates time to songInfo
  const handleTimeUpdate = (e) => {
    setSongInfo({
      ...songInfo,
      currentTime: e.target.currentTime,
    });
  };

  /**
   * calls auto when audio src is loaded.
   * used to set duration of song
   */
  const handleLoad = (e) => {
    setSongInfo({
      ...songInfo,
      duration: e.target.duration,
    });
  };

  /** handles seek / drag event */
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
