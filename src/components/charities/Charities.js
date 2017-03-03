import React, { Component } from 'react';
import { QueryBuilder } from './query_builder/QueryBuilder';
import { Response } from './Response';
import { loadCharities } from '../../lib/charitiesService';


export class Charities extends Component {
  state = {
    queryStrings: {
      filter: '',
      projection: '',
      sort: '',
      page: ''
    },
    queryUpdated: false,
    loading: false,
    numRequests: 0,
    response: null
  }
  requestCharities = queryStringsArray => {
    let requestId
    this.setState((prevState) => {
      requestId = prevState.numRequests + 1
      return {loading: true, queryUpdated: false, numRequests: requestId}
    })
    loadCharities(queryStringsArray)
    .then(response => {
      this.setState((prevState) => {
        const isLatest = requestId===prevState.numRequests
        return isLatest ? {loading: false, response} : {}
      })
    })
  }
  onFormSubmit = event => {
    event.preventDefault()
    this.requestCharities(this.queryStringsArray())
  }
  updateQuery = (queryType, value) => {
    this.setState((prevState) => {
      const queryStrings = {...prevState.queryStrings}
      queryStrings[queryType] = value
      return {
        queryStrings,
        queryUpdated: true
      }
    })
  }
  queryStringsArray = () => {
    const queryTypes = Object.keys(this.state.queryStrings)
    const queryArray = queryTypes.reduce((acc, queryType) => {
      const queryString = this.state.queryStrings[queryType]
      return queryString==='' ? acc : [...acc, {queryType, queryString}]
    }, [])
    return queryArray
  }
  renderDescription = () => (
    <div className="lead">
      <p>
        Use the <i>Query Builder</i> below to construct a GET request to the CharityBase API.
        For detailed instructions, see the <a href="https://github.com/tithebarn/charity-base/blob/master/api/README.md">API docs</a>.
      </p>
    </div>
  )
  render() {
    return (
      <div style={{paddingTop: '40px'}}>
        {this.renderDescription()}
        <QueryBuilder
        onFilterChange={this.updateQuery.bind(null, 'filter')}
        onProjectionChange={this.updateQuery.bind(null, 'projection')}
        onSortChange={this.updateQuery.bind(null, 'sort')}
        onPageChange={this.updateQuery.bind(null, 'page')}
        queryStringsArray={this.queryStringsArray()}
        outDated={this.state.queryUpdated}
        onFormSubmit={this.onFormSubmit}
        />
        <Response
        loading={this.state.loading}
        outDated={this.state.queryUpdated}
        jsonData={this.state.response}
        />
      </div>
    )
  }
}