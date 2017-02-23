import React, {Component} from 'react';
import { Row, Col, Panel, Button } from 'react-bootstrap';
import { Filters } from './Filters';
import { Projections } from './Projections';

export class QueryBuilder extends Component {
  state = {
    open: true
  }
  render() {
    const { onFilterChange, onProjectionChange } = this.props
    return (
      <div>
        <div className="text-right">
          <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
            {this.state.open ? 'Hide Query Builder' : 'Show Query Builder'}
          </Button>
        </div>
        <Panel collapsible expanded={this.state.open}>
          <Row>
            <Col xs={8}><Filters onChange={onFilterChange} /></Col>
            <Col xs={4}><Projections onChange={onProjectionChange} /></Col>
          </Row>
        </Panel>
      </div>
    )
  }
}

QueryBuilder.propTypes = {
  onFilterChange: React.PropTypes.func,
  onProjectionChange: React.PropTypes.func
}