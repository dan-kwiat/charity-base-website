import React, { Component } from 'react';
import { Filters } from './Filters';
import { Projections } from './Projections';

export class Query extends Component {
  state = {
    filter: '',
    projection: ''
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-6"><Filters onChange={filter=>this.setState({filter})} /></div>
          <div className="col-xs-6"><Projections onChange={projection=>this.setState({projection})}/></div>
        </div>
        <code>
          <span className="filter-query">{this.state.filter}</span>
          <span style={{color:'#aaa'}}>&</span>
          <span className="projection-query">{this.state.projection}</span>
        </code>
      </div>
    )
  }
}