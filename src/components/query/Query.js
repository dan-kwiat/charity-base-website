import React, { Component } from 'react';
import { Filters } from './Filters';
import { Projections } from './Projections';

export class Query extends Component {
  state = {
    filterString: '',
    projectionString: ''
  }
  stringify = (query) => {
    return Object.keys(query)
    .map(k => `${k}${query[k]}`)
    .join('&')
  }
  updateFilterString = (query) => {
    this.setState({
      filterString: this.stringify(query)
    })
  }
  updateProjection = (projectionString) => {
    this.setState({projectionString})
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-6"><Filters onQueryChange={this.updateFilterString} /></div>
          <div className="col-xs-6"><Projections onChange={this.updateProjection}/></div>
        </div>
        <code>
          <span className="filter-query">{this.state.filterString}</span>
          <span style={{color:'#aaa'}}>&</span>
          <span className="projection-query">{this.state.projectionString}</span>
        </code>
      </div>
    )
  }
}