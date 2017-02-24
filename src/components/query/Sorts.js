import React, {Component} from 'react';
import { Col, FormGroup, Radio, Checkbox } from 'react-bootstrap';

const sorts = [
  {name: 'Charity Number', field: 'charityNumber'},
  {name: 'Gross Income', field: 'mainCharity.income'}
]

export class Sorts extends Component {
  state = {
    sortField: 'charityNumber',
    reverse: false
  }
  componentDidMount() {
    this.updateString(this.state.sortField, this.state.reverse)
  }
  updateField = (field, event) => {
    this.setState({sortField: field})
    this.updateString(field, this.state.reverse)
  }
  updateOrder = (event) => {
    const reverse = event.target.checked
    this.setState({reverse})
    this.updateString(this.state.sortField, reverse)
  }
  updateString = (field, reverse) => {
    const sortString = field===null ? '' : reverse ? `sort=-${field}` : `sort=${field}`
    this.props.onChange(sortString)
  }
  render() {
    return (
      <div className="query-box sort-form">
        <h3 className="text-center">Sorting</h3>
        <FormGroup>
          {sorts.map((s, i) => {
            return (
              <Col key={i} xs={12}>
                <Radio
                name="sortingRadios"
                defaultChecked={this.state.sortField===s.field}
                onChange={this.updateField.bind(null, s.field)} >
                  {s.name}
                </Radio>
              </Col>
            )
          })}
        </FormGroup>
        <FormGroup>
          <Col xs={12}>
            <Checkbox defaultChecked={this.state.reverse} onChange={this.updateOrder} >
              Descending
            </Checkbox>
          </Col>
        </FormGroup>
      </div>
    )
  }
}

Sorts.propTpes = {
  onChange: React.PropTypes.func
}