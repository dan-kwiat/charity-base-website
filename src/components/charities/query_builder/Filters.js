import React, { Component } from 'react';
import { FormGroup, Row, Col, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';
import { removeByValue } from '../../../lib/queryBuilderHelpers';


export class Filters extends Component {
  updateQuery = (filterKey, event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value.trim().split(' ').join('+')
    const query = {...this.props.query}
    query[filterKey] = value
    const pruned = removeByValue(query, '')
    this.props.onChange(pruned)
  }
  inputs = [
    {name: 'Minimum Gross Income', key: 'mainCharity.income>=', type: 'number', placeHolder: 'E.g. 0'},
    {name: 'Maximum Gross Income', key: 'mainCharity.income<=', type: 'number', placeHolder: 'E.g. 17000'},
    {name: 'Charity Number', key: 'charityNumber=', type: 'number', placeHolder: 'E.g. 202918', min: 200000},
    {name: 'Subsidiary Number', key: 'subNumber=', type: 'number', placeHolder: 'E.g. 0', min: 0},
    {name: 'Search Terms', key: 'search=', type: 'text', placeHolder: 'E.g. NHS London'}
  ]
  render() {
    const {query} = this.props
    return (
      <div className="query-box filter-form">
        <Row>
          {this.inputs.map((x, j) => (
            <Col key={j} sm={6}>
              <FormGroup key={j}>
                <Col componentClass={ControlLabel} sm={6}>
                  {x.name}
                </Col>
                <Col sm={6}>
                  <FormControl type={x.type} min={x.min} placeholder={x.placeHolder} defaultValue={query[x.key]} onChange={this.updateQuery.bind(null, x.key)} />
                </Col>
              </FormGroup>
            </Col>
          ))}
          <Col sm={6}>
            <FormGroup>
              <Col xs={12} className="text-center">
                <Checkbox defaultChecked={query['registered=']} onChange={this.updateQuery.bind(null, 'registered=')} >Registered / De-registered</Checkbox>
              </Col>
            </FormGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

Filters.propTypes = {
  query: React.PropTypes.object,
  onChange: React.PropTypes.func
}
