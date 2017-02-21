import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';


export class Charities extends Component {
  state = {
    charities: [{id:0, name:'c1'}, {id:1, name:'c2'}]
  }
  render() {
    return (
      <div>
        <input />
        {this.state.charities.map((x,i) => {
          return (
            <div key={i}>
              <Link to={`/charities/${x.id}`}>{x.name}</Link>
            </div>
          )
        })}
        <Route path="/charities/:charityId" render={({match}) => {
          const charity = this.state.charities.find(x => x.id===Number(match.params.charityId))
          return (
            <div>
              <div>CharityId: {charity.id}</div>
              <div>CharityName: {charity.name}</div>
            </div>
          )
        }} />
      </div>
    )
  }
}