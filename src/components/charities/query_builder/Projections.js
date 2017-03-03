import React, { Component } from 'react';
import { FormGroup, Row, Col, Checkbox } from 'react-bootstrap';
import { removeByValue } from '../../../lib/queryBuilderHelpers';


export class Projections extends Component {
  updateQuery = (field, event) => {
    const fields = {...this.props.query.fields}
    fields[field] = event.target.checked
    const pruned = removeByValue(fields, false)
    return this.props.onChange({fields: pruned})
  }
  projections = [
    {name: 'Main Info', field: 'mainCharity'},
    {name: 'All Names', field: 'otherNames'},
    {name: 'Contact', field: 'contact'},
    {name: 'Beta Info', field: 'beta'},
    {name: 'Financial Info', field: 'financial'},
    {name: 'Governing Doc', field: 'govDoc'},
    {name: 'Trustees', field: 'trustees'},
    {name: 'Area of Benefit', field: 'areaOfBenefit'},
    {name: 'Area of Operation', field: 'areaOfOperation'},
    {name: 'Accounts', field: 'accountSubmission'},
    {name: 'Returns', field: 'returnSubmission'},
    {name: 'Class', field: 'class'},
    {name: 'Objects', field: 'objects'},
    {name: 'Part B', field: 'partB'},
    {name: 'Registration', field: 'registration'}
  ]
  render() {
    return (
      <div>
        <p>Choose which fields are returned:</p>
        <div className="query-box projection-form">
          <Row>
            {this.projections.map((p, i) => (
              <Col key={i} sm={6} md={4} lg={3}>
                <FormGroup>
                  <Col xs={12}>
                    <Checkbox defaultChecked={this.props.query.fields[p.field]} onChange={this.updateQuery.bind(null, p.field)} >
                      {p.name}
                    </Checkbox>
                  </Col>
                </FormGroup>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    )
  }
}

Projections.propTypes = {
  query: React.PropTypes.object,
  onChange: React.PropTypes.func
}
