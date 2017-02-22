import React, { Component } from 'react';
import { Form, FormGroup, Col, Checkbox } from 'react-bootstrap';

const projections = [
  'govDoc',
  'areaOfBenefit',
  'mainCharity',
  'contact',
  'accountSubmission',
  'returnSubmission',
  'areaOfOperation',
  'class',
  'financial',
  'otherNames',
  'objects',
  'partB',
  'registration',
  'trustees',
  'beta'
];


export class Projections extends Component {
  state = {
    fields: {
      mainCharity: true
    }
  }
  componentDidMount() {
    this.updateString(this.state.fields)
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
    this.updateString(fields)
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
        <Form horizontal>
          {
            projections.map((f, i) => {
              return (
                <FormGroup key={i}>
                  <Col sm={12}>
                    <Checkbox defaultChecked={this.state.fields[f]} onChange={this.updateFields.bind(null, f)} >
                      {f}
                    </Checkbox>
                  </Col>
                </FormGroup>
              )

            })
          }
        </Form>
      </div>
    )
  }
}

Projections.propTypes = {
  onChange: React.PropTypes.func
}
