import React, { Component } from 'react';
import { Filters } from './Filters';
import { Projections } from './Projections';
import { Row, Col, Panel } from 'react-bootstrap';

const QueryBuilder = ({onFilterChange, onProjectionChange}) => {
  return (
    <Panel collapsible defaultExpanded header="Query Builder">
      <Row>
        <Col xs={6}><Filters onChange={onFilterChange} /></Col>
        <Col xs={6}><Projections onChange={onProjectionChange} /></Col>
      </Row>
    </Panel>
  )
}

QueryBuilder.propTypes = {
  onFilterChange: React.PropTypes.func,
  onProjectionChange: React.PropTypes.func
}

export class Query extends Component {
  state = {
    filter: '',
    projection: ''
  }
  render() {
    return (
      <div style={{paddingTop: '50px'}}>
        <QueryBuilder
        onFilterChange={filter=>this.setState({filter})}
        onProjectionChange={projection=>this.setState({projection})}
        />
        <code>
          <span className="filter-query">{this.state.filter}</span>
          <span style={{color:'#aaa'}}>&</span>
          <span className="projection-query">{this.state.projection}</span>
        </code>
      </div>
    )
  }
}