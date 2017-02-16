import React from 'react'
import { Link } from 'react-router-dom'

export const Nav = (props) => {
  const routes = [
    {url: '/1', name: 'One'},
    {url: '/2', name: 'Two'},
    {url: '/3', name: 'Three'}
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