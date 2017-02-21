import React, { Component } from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

export class Filters extends Component {
  state = {
    query: {
      'subNumber=': 0,
      'registered=': true
    }
  }
  componentDidMount() {
    this.props.onQueryChange(this.state.query)
  }
  updateQuery = (param, op, event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value.trim().split(' ').join('+')
    const query = {...this.state.query}
    query[`${param}${op}`] = value
    if (value==='') {
      delete(query[`${param}${op}`])
    }
    this.setState({query})
    this.props.onQueryChange(query)
  }
  render() {
    return (
      <div className="filter-form">
        <h3>Filters</h3>
        <Form horizontal>
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
              Search terms
            </Col>
            <Col sm={6}>
              <FormControl type="text" placeholder="E.g. NHS London" onChange={this.updateQuery.bind(null, 'search', '=')} />
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
            <Col sm={12}>
              <Checkbox defaultChecked={this.state.query['registered=']} onChange={this.updateQuery.bind(null, 'registered', '=')} >Registered / De-registered</Checkbox>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

Filters.propTypes = {
  onQueryChange: React.PropTypes.func
}