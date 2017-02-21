import React from 'react'
import { Link } from 'react-router-dom'

export const Nav = (props) => {
  const routes = [
    {url: '/', name: 'API'},
    {url: '/charities', name: 'Charities'},
    {url: '/analysis', name: 'Analysis'},
    {url: '/about', name: 'About'}
  ]
  return (
    <ul className="nav nav-tabs">
      {
        routes.map((r, i) => {
          return (
            <li
            key={i}
            role="presentation"
            className={r.url===props.activeUrl ? 'active' : ''}>
              <Link to={r.url}>{r.name}</Link>
            </li>
          )
        })
      }
    </ul>
  )
}

Nav.propTypes = {
  activeUrl: React.PropTypes.string
}