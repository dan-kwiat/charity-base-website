import React, { Component } from 'react';
import { FormGroup, Col, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

export class Filters extends Component {
  updateQuery = (filterKey, event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value.trim().split(' ').join('+')
    const query = {...this.props.query}
    query[`${filterKey}`] = value
    if (value==='') {
      delete(query[`${filterKey}`])
    }
    this.props.onChange(query)
  }
  render() {
    const {query} = this.props
    return (
      <div className="query-box filter-form">
        <h3 className="text-center">Filters</h3>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Search terms
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. NHS London" defaultValue={query['search=']} onChange={this.updateQuery.bind(null, 'search=')} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Minimum Gross Income
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. 0" defaultValue={query['mainCharity.income>=']} onChange={this.updateQuery.bind(null, 'mainCharity.income>=')} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Maximum Gross Income
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. 17000" defaultValue={query['mainCharity.income<=']} onChange={this.updateQuery.bind(null, 'mainCharity.income<=')} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Charity Number
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. 202918" defaultValue={query['charityNumber=']} onChange={this.updateQuery.bind(null, 'charityNumber=')} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Subsidiary Number
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. 0" defaultValue={query['subNumber=']} onChange={this.updateQuery.bind(null, 'subNumber=')} />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={6} sm={6}>
            <Checkbox defaultChecked={query['registered=']} onChange={this.updateQuery.bind(null, 'registered=')} >Registered / De-registered</Checkbox>
          </Col>
        </FormGroup>
      </div>
    )
  }
}

Filters.propTypes = {
  query: React.PropTypes.object,
  onChange: React.PropTypes.func
}
