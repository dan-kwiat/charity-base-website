import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Form, FormGroup, Col, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

class Filters extends Component {
  state = {
    query: {
      'subNumber=': 0,
      'registered=': true
    },
    filterString: ''
  }
  componentDidMount() {
    this.setState({
      filterString: this.stringify(this.state.query)
    })
  }
  stringify = (query) => {
    return Object.keys(query)
    .map(k => `${k}${query[k]}`)
    .join('&')
  }
  updateQuery = (param, op, event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value.trim().split(' ').join('+')
    const query = {...this.state.query}
    query[`${param}${op}`] = value
    if (value==='') {
      delete(query[`${param}${op}`])
    }
    this.setState({
      query: query,
      filterString: this.stringify(query)
    })
  }
  render() {
    return (
      <div className="filter-form">
        <h3>Filters</h3>
        <div>{this.state.filterString}</div>
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




export class Charities extends Component {
  state = {
    charities: [{id:0, name:'c1'}, {id:1, name:'c2'}]
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-6"><Filters /></div>
          <div className="col-xs-6"></div>
        </div>
        <input />
        {this.state.charities.map((x,i) => {
          return (
            <div key={i}>
              <Link to={`/charities/${x.id}`}>{x.name}</Link>
            </div>
          )
        })}
        <Route path="/charities/:charityId" render={({match}) => {
          const charity = this.state.charities.find(x => x.id===Number(match.params.charityId))
          return (
            <div>
              <div>CharityId: {charity.id}</div>
              <div>CharityName: {charity.name}</div>
            </div>
          )
        }} />
      </div>
    )
  }
}