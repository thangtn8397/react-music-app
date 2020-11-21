import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ clickLibraryBtn }) => {
  return (
    <div className="nav-container">
      <h1>Waves</h1>
      <button onClick={clickLibraryBtn}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </div>
  );
};

export default Nav;
