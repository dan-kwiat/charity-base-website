import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Form, FormGroup, Col, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

const Filters = () => {
  return (
    <div className="filter-form">
      <h3>Filters</h3>
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Minimum Gross Income
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. 0" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Maximum Gross Income
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. 17000" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Search terms
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. NHS London" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Charity Number
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. 202918" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={6}>
            Subsidiary Number
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="E.g. 0" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={12}>
            <Checkbox>Registered charities only</Checkbox>
          </Col>
        </FormGroup>
      </Form>
    </div>
  )
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