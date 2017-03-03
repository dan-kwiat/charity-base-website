import React, {Component} from 'react';
import { Row, Col, FormGroup, Checkbox, ControlLabel, FormControl } from 'react-bootstrap';

export class Pages extends Component {
  state = {
    countResults: false,
    limit: 10,
    skip: 0
  }
  componentDidMount() {
    this.updateString(this.state.countResults, this.state.limit, this.state.skip)
  }
  componentDidUpdate(prevProps, prevState) {
    const stateUpdated = prevState!==this.state
    if (stateUpdated) {
      this.updateString(this.state.countResults, this.state.limit, this.state.skip)
    }
  }
  updateString = (countResults, limit, skip) => {
    const pageString = `limit=${limit}&skip=${skip}` + (countResults ? '&countResults' : '')
    this.props.onChange(pageString)
  }
  render() {
    return (
      <div className="query-box page-form">
        <h3 className="text-center">Pagination</h3>
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
                defaultValue={this.state.limit}
                onChange={e => this.setState({limit: e.target.value})}
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
                defaultValue={1 + this.state.skip/10}
                onChange={e => this.setState({skip: this.state.limit*(e.target.value-1)})}
                />
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Col xs={12} className="text-center">
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