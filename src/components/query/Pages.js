import React, {Component} from 'react';
import { Col, FormGroup, Checkbox } from 'react-bootstrap';

export class Pages extends Component {
  state = {
    countResults: false
  }
  componentDidMount() {
    this.updateString(this.state.countResults)
  }
  componentDidUpdate(prevProps, prevState) {
    const stateUpdated = prevState!==this.state
    if (stateUpdated) {
      this.updateString(this.state.countResults)
    }
  }
  updateString = (countResults) => {
    const pageString = countResults ? 'countResults' : ''
    this.props.onChange(pageString)
  }
  render() {
    return (
      <div className="query-box page-form">
        <h3 className="text-center">Pagination</h3>
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