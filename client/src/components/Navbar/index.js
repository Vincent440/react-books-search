import React from 'react'
import { NavLink } from 'react-router-dom'
function Navbar () {
  return (
    <nav className='navbar navbar-expand navbar-dark bg-secondary'>
      <span className='navbar-brand'>Google Books</span>
      <ul className='navbar-nav mr-auto'>
        <li className='nav-item'>
          <NavLink className='nav-link' activeClassName='active' exact to='/'>
            <svg class="bi bi-search" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
              <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
            </svg>
            &nbsp;Search
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' activeClassName='active' exact to='/saved'>Saved</NavLink>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar
