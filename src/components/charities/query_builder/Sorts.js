import React, {Component} from 'react';
import { Col, FormGroup, Radio, Checkbox } from 'react-bootstrap';

const sorts = [
  {name: 'Charity Number', field: 'charityNumber'},
  {name: 'Gross Income', field: 'mainCharity.income'}
]

export class Sorts extends Component {
  updateQuery = newKeyValues => {
    const query = {...this.props.query, ...newKeyValues}
    return this.props.onChange(query)
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
                defaultChecked={this.props.query.sortField===s.field}
                onChange={e => this.updateQuery({sortField: s.field})}
                >
                  {s.name}
                </Radio>
              </Col>
            )
          })}
        </FormGroup>
        <FormGroup>
          <Col xs={12}>
            <Checkbox
            defaultChecked={this.props.query.reverse}
            onChange={e => this.updateQuery({reverse: e.target.checked})}
            >
              Descending
            </Checkbox>
          </Col>
        </FormGroup>
      </div>
    )
  }
}

Sorts.propTpes = {
  query: React.PropTypes.object,
  onChange: React.PropTypes.func
}
