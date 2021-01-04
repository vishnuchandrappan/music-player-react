import { ChevronLeft, ChevronRight, Pause, Play } from "react-feather";
import { formatTime } from "../utils/helpers";

export const Player = ({
  previousSong,
  nextSong,
  togglePlay,
  isPlaying,
  songInfo: { currentTime, duration },
  handleDrag,
  currentSong,
}) => (
  <div className="player">
    <div className="time-control">
      <p>{formatTime(currentTime)}</p>
      <div
        className="track"
        style={{
          background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
        }}
      >
        <input
          type="range"
          onChange={handleDrag}
          min={0}
          max={duration}
          value={currentTime}
        />
        <div
          style={{
            transform: `translateX(${(currentTime / duration) * 100}%)`,
          }}
          className="animate-track"
        ></div>
      </div>
      <p>{formatTime(duration)}</p>
    </div>
    <div className="play-control">
      <ChevronLeft onClick={previousSong} />
      {isPlaying ? (
        <Pause onClick={togglePlay} />
      ) : (
        <Play onClick={togglePlay} />
      )}
      <ChevronRight onClick={nextSong} />
    </div>
  </div>
);
