import React, { Component } from 'react';
import { Filters } from './Filters';

export class Query extends Component {
  state = {
    filterString: ''
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
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-6"><Filters onQueryChange={this.updateFilterString} /></div>
          <div className="col-xs-6"></div>
        </div>
        <code className="filter-query">{this.state.filterString}</code>
      </div>
    )
  }
}