import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import { Nav, Charities, GitHubFlag } from './components';


const Director = ({url}) => {
  switch(url) {
    case '/':
      return (
        <div>
          Home
        </div>
      )
    case '/charities':
      return (
        <div>
          <Charities />
        </div>
      )
    default:
      return <Redirect to="/" />
  }
}


const App = () => {
  return (
    <div className="App">
      <GitHubFlag />
      <div className="App-header">
        <h2>CharityBase<small>.uk</small></h2>
        <p className="App-intro">
          The API for charity data
        </p>
      </div>
      <div className="container">
        <Nav />
        <Route path="/:filter?" render={({match}) => <Director {...match} />} />
      </div>
    </div>
  );
}


export default App;
