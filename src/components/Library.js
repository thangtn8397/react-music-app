import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, selectedSongHandle, show }) => {
  return (
    <div className={`library ${show ? "show" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            key={song.id}
            song={song}
            clickedSong={() => selectedSongHandle(song.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
