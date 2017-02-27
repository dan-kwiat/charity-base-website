import React, {Component} from 'react';
import { Col, FormGroup, Checkbox, ControlLabel, FormControl } from 'react-bootstrap';

export class Pages extends Component {
  state = {
    countResults: false,
    limit: 10,
    skip: 0
  }
  componentDidMount() {
    this.updateString(this.state.countResults, this.state.skip)
  }
  componentDidUpdate(prevProps, prevState) {
    const stateUpdated = prevState!==this.state
    if (stateUpdated) {
      this.updateString(this.state.countResults, this.state.skip)
    }
  }
  updateString = (countResults, skip) => {
    const pageString = `skip=${skip}` + (countResults ? '&countResults' : '')
    this.props.onChange(pageString)
  }
  render() {
    return (
      <div className="query-box page-form">
        <h3 className="text-center">Pagination</h3>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={4}>
            Page
          </Col>
          <Col sm={8}>
            <FormControl
            type="number"
            min="1"
            placeholder="E.g. 1"
            defaultValue={1 + this.state.skip/10}
            onChange={e => this.setState({skip: this.state.limit*(e.target.value-1)})}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col xs={12}>
            <Checkbox
            defaultChecked={this.state.countResults}
            onChange={e => this.setState({countResults: e.target.checked})}
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
  onChange: React.PropTypes.func
}