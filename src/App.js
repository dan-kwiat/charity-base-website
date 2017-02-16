import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';


const Nav = (props) => {
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


class App extends Component {
  state = {
    activeKey: 1
  }
  handleSelect = (selectedKey) => {
    this.setState({
      activeKey: selectedKey
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="container">
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Route path="/:filter?" render={({match}) => {
            return <Nav activeUrl={match.url} />
          }} />
        </div>
      </div>
    );
  }
}

export default App;
