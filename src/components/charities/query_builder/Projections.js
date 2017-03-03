import React, { Component } from 'react';
import { FormGroup, Row, Col, Checkbox } from 'react-bootstrap';


const projections = [
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


export class Projections extends Component {
  state = {
    fields: {
      mainCharity: true
    }
  }
  componentDidMount() {
    this.updateString(this.state.fields)
  }
  componentDidUpdate(prevProps, prevState) {
    const stateUpdated = prevState!==this.state
    if (stateUpdated) {
      this.updateString(this.state.fields)
    }
  }
  updateFields = (field, event) => {
    const checked = event.target.checked
    const fields = this.state.fields
    if (checked) {
      fields[field] = checked
    } else {
      delete(fields[field])
    }
    this.setState({fields})
  }
  updateString = (fields) => {
    const commaSeparated = Object.keys(fields).join(',')
    const projectionString = commaSeparated ? `fields=${commaSeparated}` : ''
    this.props.onChange(projectionString)
  }
  render() {
    return (
      <div className="query-box projection-form">
        <h3 className="text-center">Projections</h3>
        <Row>
          {projections.map((p, i) => (
            <Col key={i} sm={6} md={4} lg={3}>
              <FormGroup>
                <Col xs={12}>
                  <Checkbox defaultChecked={this.state.fields[p.field]} onChange={this.updateFields.bind(null, p.field)} >
                    {p.name}
                  </Checkbox>
                </Col>
              </FormGroup>
            </Col>
          ))}
        </Row>
      </div>
    )
  }
}

Projections.propTypes = {
  onChange: React.PropTypes.func
}
