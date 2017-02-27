import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import { Nav, Charities, About, GitHubFlag } from './components';


const Director = ({url}) => {
  switch(url) {
    case '/':
      return (
        <div>
          <Charities />
        </div>
      )
    case '/about':
      return (
        <About />
      )
    default:
      return <Redirect to="/" />
  }
}

import { StickyContainer, Sticky } from 'react-sticky';
const App = () => {
  return (
    <div className="App">
      <StickyContainer>
        <GitHubFlag />
        <div className="App-header">
          <h1>CharityBase<small>.uk</small></h1>
          <p className="App-intro">
            API for Charity Data
          </p>
          <Sticky stickyClassName="sticky-header">
            <Nav />
          </Sticky>
        </div>
        <div className="container">
          <Route path="/:filter?" render={({match}) => <Director {...match} />} />
        </div>
      </StickyContainer>
    </div>
  );
}


export default App;
