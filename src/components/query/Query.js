import React, { Component } from 'react';
import { QueryBuilder } from './QueryBuilder';
import { Request } from './Request';
import { Response } from './Response';
import { loadCharities } from '../../lib/charitiesService';


export class Query extends Component {
  state = {
    queryStrings: {
      filter: '',
      projection: ''
    },
    response: {},
    loading: false,
    numRequests: 0
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.queryStrings!==this.state.queryStrings) {
      let requestId
      this.setState((prevState) => {
        requestId = prevState.numRequests + 1
        return {loading: true, numRequests: requestId}
      })
      loadCharities(this.state.queryStrings)
      .then(response => {
        this.setState((prevState) => {
          const isLatest = requestId===prevState.numRequests
          return isLatest ? {loading: false, response} : {}
        })
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
    return (
      <div style={{paddingTop: '50px'}}>
        <QueryBuilder
        onFilterChange={this.updateQueryStrings.bind(null, 'filter')}
        onProjectionChange={this.updateQueryStrings.bind(null, 'projection')}
        />
        <Request {...this.state.queryStrings} />
        <Response loading={this.state.loading} jsonData={this.state.response} />
      </div>
    )
  }
}