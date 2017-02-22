import React, { Component } from 'react';
import { QueryBuilder } from './QueryBuilder';
import { loadCharities } from '../../lib/charitiesService';


export class Query extends Component {
  state = {
    queryStrings: {
      filter: '',
      projection: ''
    },
    response: {},
    loading: false
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.queryStrings!==this.state.queryStrings) {
      this.setState({loading: true})
      loadCharities(this.state.queryStrings)
      .then(response => {
        this.setState({loading:false, response})
      })
    }
  }
  updateQueryStrings = (queryType, value) => {
    this.setState((prevState) => {
      const queryStrings = {...prevState.queryStrings}
      queryStrings[queryType] = value
      return {queryStrings}
    })
  }
  render() {
    const {filter, projection} = this.state.queryStrings
    return (
      <div style={{paddingTop: '50px'}}>
        <QueryBuilder
        onFilterChange={this.updateQueryStrings.bind(null, 'filter')}
        onProjectionChange={this.updateQueryStrings.bind(null, 'projection')}
        />
        <code>
          <span className="filter-query">{filter}</span>
          <span style={{color:'#aaa'}}>&</span>
          <span className="projection-query">{projection}</span>
        </code>
        <pre>
          {this.state.loading ? 'Loading...' : JSON.stringify(this.state.response, undefined, 2)}
        </pre>
      </div>
    )
  }
}