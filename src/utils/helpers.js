export const formatTime = (time) =>
  Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
