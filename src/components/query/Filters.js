import React, { Component } from 'react';
import { FormGroup, Col, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

export class Filters extends Component {
  state = {
    query: {
      'subNumber=': 0,
      'registered=': true
    }
  }
  componentDidMount() {
    this.updateString(this.state.query)
  }
  updateQuery = (param, op, event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value.trim().split(' ').join('+')
    const query = {...this.state.query}
    query[`${param}${op}`] = value
    if (value==='') {
      delete(query[`${param}${op}`])
    }
    this.setState({query})
    this.updateString(query)
  }
  stringify = (query) => {
    return Object.keys(query)
    .map(k => `${k}${query[k]}`)
    .join('&')
  }
  updateString = (query) => {
    const filterString = this.stringify(query)
    this.props.onChange(filterString)
  }
  render() {
    return (
      <div className="query-box filter-form">
        <h3 className="text-center">Filters</h3>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Search terms
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. NHS London" onChange={this.updateQuery.bind(null, 'search', '=')} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Minimum Gross Income
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. 0" onChange={this.updateQuery.bind(null, 'mainCharity.income', '>=')} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Maximum Gross Income
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. 17000" onChange={this.updateQuery.bind(null, 'mainCharity.income', '<=')} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Charity Number
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. 202918" onChange={this.updateQuery.bind(null, 'charityNumber', '=')} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Subsidiary Number
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. 0" defaultValue={this.state.query['subNumber=']} onChange={this.updateQuery.bind(null, 'subNumber', '=')} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={6} sm={6}>
            <Checkbox defaultChecked={this.state.query['registered=']} onChange={this.updateQuery.bind(null, 'registered', '=')} >Registered / De-registered</Checkbox>
          </Col>
        </FormGroup>
      </div>
    )
  }
}

Filters.propTypes = {
  onChange: React.PropTypes.func
}
