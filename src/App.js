import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import { Nav } from './components';

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
