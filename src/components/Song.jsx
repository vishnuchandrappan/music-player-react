export const Song = ({ currentSong }) => (
  <div className="song">
    <img
      className="song__cover"
      src={currentSong.cover}
      alt={currentSong.name}
    />
    <div className="song__details">
      <h1>{currentSong.name}</h1>
      <h3>{currentSong.artist}</h3>
    </div>
  </div>
);
