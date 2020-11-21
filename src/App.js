import "./styles/app.scss";
import Song from "./components/Song";
import Player from "./components/Player";
import Nav from "./components/Nav";
import data from "./util";
import { useEffect, useRef, useState } from "react";
import Library from "./components/Library";

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(data[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryShow, setLibraryShow] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else audioRef.current.pause();
  });

  const updateTimeHandle = () => {
    setSongInfo({
      currentTime: audioRef.current.currentTime,
      duration: audioRef.current.duration,
    });
  };

  const selectedSongHandle = (songId) => {
    const selectedSong = songs.filter((song) => song.id === songId)[0];
    // Add active state
    const newSongs = songs.map((song) => {
      if (song.id === songId) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    setCurrentSong(selectedSong);
    if (isPlaying) {
      const promisePlay = audioRef.current.play();
      if (promisePlay !== undefined) {
        promisePlay.then(() => audioRef.current.play());
      }
    }
  };

  const skipSongHandle = (type) => {
    const indexSong = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong;
    if (type === "skip-forward")
      nextSong = songs[(indexSong + 1) % songs.length];
    else if (type === "skip-back") {
      if (indexSong - 1 === -1) {
        nextSong = songs[songs.length - 1];
      } else nextSong = songs[(indexSong - 1) % songs.length];
    }
    selectedSongHandle(nextSong.id);
  };

  return (
    <div className={`App ${libraryShow ? "active-library" : ""}`}>
      <Nav clickLibraryBtn={() => setLibraryShow(!libraryShow)} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        skipSongHandle={skipSongHandle}
      />
      <Library
        songs={songs}
        selectedSongHandle={selectedSongHandle}
        show={libraryShow}
      />
      <audio
        src={currentSong.audio}
        ref={audioRef}
        onTimeUpdate={updateTimeHandle}
        onLoadedMetadata={updateTimeHandle}
        onEnded={() => skipSongHandle("skip-forward")}
      ></audio>
    </div>
  );
}

export default App;
