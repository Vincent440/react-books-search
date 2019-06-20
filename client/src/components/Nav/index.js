import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Google React Books Search
      </a>
        <a className="nav-item nav-link" href="/">Search</a>
        <a className="nav-item nav-link" href="/saved">Saved</a>
    </nav>
  );
}

export default Nav;
