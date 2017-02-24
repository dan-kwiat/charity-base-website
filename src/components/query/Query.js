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
  onFormSubmit = (queryStrings, event) => {
    event.preventDefault()
    this.requestCharities(queryStrings)
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
        <Form horizontal onSubmit={this.onFormSubmit.bind(null, this.state.queryStrings)}>
          <QueryBuilder
          onFilterChange={this.updateQueryStrings.bind(null, 'filter')}
          onProjectionChange={this.updateQueryStrings.bind(null, 'projection')}
          onSortChange={this.updateQueryStrings.bind(null, 'sort')}
          onPageChange={this.updateQueryStrings.bind(null, 'page')}
          />
          <Request
          {...this.state.queryStrings}
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