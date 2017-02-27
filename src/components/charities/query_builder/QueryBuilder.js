import React, {Component} from 'react';
import { Row, Col, Panel, Button } from 'react-bootstrap';
import { Filters } from './Filters';
import { Projections } from './Projections';
import { Sorts } from './Sorts';
import { Pages } from './Pages';


export class QueryBuilder extends Component {
  state = {
    open: true
  }
  render() {
    const { onFilterChange, onProjectionChange, onSortChange, onPageChange } = this.props
    return (
      <div>
        <div className="text-right">
          <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
            {this.state.open ? 'Hide Query Builder' : 'Show Query Builder'}
          </Button>
        </div>
        <Panel collapsible expanded={this.state.open}>
          <Row>
            <Col sm={6}><Filters onChange={onFilterChange} /></Col>
            <Col sm={3}><Projections onChange={onProjectionChange} /></Col>
            <Col sm={3}>
              <Sorts onChange={onSortChange} />
              <Pages onChange={onPageChange} />
            </Col>
          </Row>
        </Panel>
      </div>
    )
  }
}

QueryBuilder.propTypes = {
  onFilterChange: React.PropTypes.func,
  onProjectionChange: React.PropTypes.func,
  onSortChange: React.PropTypes.func,
  onPageChange: React.PropTypes.func
}
