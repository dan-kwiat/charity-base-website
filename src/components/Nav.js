import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  const routes = [
    {url: '/', name: 'Home'},
    {url: '/about', name: 'About'}
  ]
  return (
    <div className="container nav-container">
      <ul className="nav nav-tabs">
        {
          routes.map((r, i) => (
            <NavLink
            key={i}
            exact
            to={r.url}
            activeClassName="active"
            >
              {r.name}
            </NavLink>
          ))
        }
      </ul>
    </div>
  )
}


Nav.propTypes = {}