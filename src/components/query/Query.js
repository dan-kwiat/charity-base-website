import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { QueryBuilder } from './QueryBuilder';
import { Request } from './Request';
import { Response } from './Response';
import { loadCharities } from '../../lib/charitiesService';


export class Query extends Component {
  state = {
    queryStrings: {
      filter: '',
      projection: '',
      sort: '',
      page: ''
    },
    queryStringsArray: [],
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
    this.requestCharities(this.state.queryStringsArray)
  }
  updateQuery = (queryType, value) => {
    this.setState((prevState) => {
      const queryStrings = {...prevState.queryStrings}
      queryStrings[queryType] = value
      const queryStringsArray = this.objToArray(queryStrings)
      return {
        queryStrings,
        queryStringsArray,
        queryUpdated: true
      }
    })
  }
  objToArray = queryStrings => {
    const queryTypes = Object.keys(queryStrings)
    const queryArray = queryTypes.reduce((acc, queryType) => {
      const queryString = queryStrings[queryType]
      return queryString==='' ? acc : [...acc, {queryType, queryString}]
    }, [])
    return queryArray
  }
  render() {
    return (
      <div style={{paddingTop: '20px'}}>
        <Form horizontal onSubmit={this.onFormSubmit}>
          <QueryBuilder
          onFilterChange={this.updateQuery.bind(null, 'filter')}
          onProjectionChange={this.updateQuery.bind(null, 'projection')}
          onSortChange={this.updateQuery.bind(null, 'sort')}
          onPageChange={this.updateQuery.bind(null, 'page')}
          />
          <Request
          queryStringsArray={this.state.queryStringsArray}
          outDated={this.state.queryUpdated}
          />
        </Form>
        <Response
        loading={this.state.loading}
        outDated={this.state.queryUpdated}
        jsonData={this.state.response}
        />
      </div>
    )
  }
}