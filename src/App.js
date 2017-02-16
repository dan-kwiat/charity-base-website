import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Nav, NavItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';


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
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="container">
          <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
            <NavItem eventKey={1}><Link key={1} to={"/1"}>One</Link></NavItem>
            <NavItem eventKey={2}><Link key={2} to={"/2"}>Two</Link></NavItem>
            <NavItem eventKey={3}><Link key={3} to={"/3"}>Three</Link></NavItem>
          </Nav>
        </div>
      </div>
    );
  }
}

export default App;
