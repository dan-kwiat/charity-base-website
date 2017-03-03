import React, {Component} from 'react';
import { Row, Col, FormGroup, Checkbox, ControlLabel, FormControl } from 'react-bootstrap';
import { removeByValue } from '../../../lib/queryBuilderHelpers';

export class Pages extends Component {
  pageNumber = (limit, skip) => {
    return (1 + (skip || 0)/(limit || 10))
  }
  skip = (limit, pageNumber) => {
    return ((limit || 10) * ((pageNumber || 1) - 1))
  }
  updateSkipLimit = (e) => {
    const {limit, skip} = this.props.query
    const pageNumber = this.pageNumber(limit, skip)
    const newLimit = Number(e.target.value)
    const newSkip = this.skip(newLimit, pageNumber)
    this.updateQuery({limit: newLimit, skip: newSkip})
  }
  updateSkip = (e) => {
    const skip = this.skip(this.props.query.limit, Number(e.target.value))
    this.updateQuery({skip})
  }
  updateQuery = (newKeyValues) => {
    const query = {...this.props.query, ...newKeyValues}
    const pruned = removeByValue(query, '')
    return this.props.onChange(pruned)
  }
  render() {
    const {limit, skip, countResults} = this.props.query
    return (
      <div className="query-box page-form">
        <Row>
          <Col sm={6}>
            <FormGroup>
              <Col componentClass={ControlLabel} xs={6}>
                Results per Page
              </Col>
              <Col xs={6}>
                <FormControl
                type="number"
                min="1"
                max="50"
                placeholder="E.g. 10"
                defaultValue={limit}
                onChange={this.updateSkipLimit}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup>
              <Col componentClass={ControlLabel} xs={6}>
                Page Number
              </Col>
              <Col xs={6}>
                <FormControl
                type="number"
                min="1"
                placeholder="E.g. 1"
                defaultValue={this.pageNumber(limit, skip)}
                onChange={this.updateSkip}
                />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Col xs={12} className="text-center">
            <Checkbox
            defaultChecked={countResults}
            onChange={e => this.updateQuery({countResults: e.target.checked})}
            >
              Count Results
            </Checkbox>
          </Col>
        </FormGroup>
      </div>
    )
  }
}

Pages.propTpes = {
  query: React.PropTypes.object,
  onChange: React.PropTypes.func
}