import React, { Component } from 'react';
import { Form, FormGroup, Col, Checkbox } from 'react-bootstrap';

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
      <div className="projection-form">
        <h3>Projections</h3>
        <Form horizontal>
          <FormGroup>
            <Col sm={12}>
              <Checkbox defaultChecked={this.state.fields.mainCharity} onChange={this.updateFields.bind(null, 'mainCharity')} >Main Info</Checkbox>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

Projections.propTypes = {
  onQueryChange: React.PropTypes.func
}
