import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  audioRef,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  skipSongHandle,
}) => {
  const clickPlayAudioHandle = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const getTime = (time) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration ? songInfo.duration : 0}
            value={songInfo.currentTime | " "}
            onChange={(e) => {
              audioRef.current.currentTime = e.target.value;
              setSongInfo({
                ...songInfo,
                currentTime: e.target.value,
              });
            }}
          />
          <div className="animated-track" style={trackAnim}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
          onClick={() => skipSongHandle("skip-back")}
        />
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          onClick={clickPlayAudioHandle}
        />
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          onClick={() => skipSongHandle("skip-forward")}
        />
      </div>
    </div>
  );
};

export default Player;
