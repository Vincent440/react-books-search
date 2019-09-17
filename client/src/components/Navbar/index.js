import React from "react";
import { NavLink } from 'react-router-dom';
function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-secondary">
      <span className="navbar-brand">Google Books</span>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/">Search</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/saved">Saved</NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;