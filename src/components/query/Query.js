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
    queryUpdated: false,
    loading: false,
    numRequests: 0,
    response: null
  }
  componentDidUpdate(prevProps, prevState) {
    const queryUpdated = prevState.queryStrings!==this.state.queryStrings
    if (queryUpdated) {
      this.setState({queryUpdated})
      if (this.state.response===null) {
        this.requestCharities(this.state.queryStrings)
      }
    }
  }
  requestCharities = queryStrings => {
    let requestId
    this.setState((prevState) => {
      requestId = prevState.numRequests + 1
      return {loading: true, queryUpdated: false, numRequests: requestId}
    })
    loadCharities(queryStrings)
    .then(response => {
      this.setState((prevState) => {
        const isLatest = requestId===prevState.numRequests
        return isLatest ? {loading: false, response} : {}
      })
    })
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
      <div style={{paddingTop: '20px'}}>
        <QueryBuilder
        onFilterChange={this.updateQueryStrings.bind(null, 'filter')}
        onProjectionChange={this.updateQueryStrings.bind(null, 'projection')}
        />
        <hr />
        <Request
        {...this.state.queryStrings}
        onRequest={this.requestCharities.bind(null, this.state.queryStrings)}
        />
        <hr />
        <Response
        loading={this.state.loading}
        outDated={this.state.queryUpdated}
        jsonData={this.state.response}
        />
      </div>
    )
  }
}