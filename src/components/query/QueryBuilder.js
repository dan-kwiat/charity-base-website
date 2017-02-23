import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import { Filters } from './Filters';
import { Projections } from './Projections';

export const QueryBuilder = ({onFilterChange, onProjectionChange}) => {
  return (
    <Panel collapsible defaultExpanded header="Query Builder">
      <Row>
        <Col xs={8}><Filters onChange={onFilterChange} /></Col>
        <Col xs={4}><Projections onChange={onProjectionChange} /></Col>
      </Row>
    </Panel>
  )
}

QueryBuilder.propTypes = {
  onFilterChange: React.PropTypes.func,
  onProjectionChange: React.PropTypes.func
}