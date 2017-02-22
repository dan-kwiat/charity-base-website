import React from 'react';
import { Panel } from 'react-bootstrap';

export const Request = ({filter, projection}) => {
  return (
    <Panel collapsible defaultExpanded header="GET Request">
      <pre className="query-string">
        <span className="default-query">https://charitybase.uk/api/v0.2.0/charities/?</span>
        <span className="filter-query">{filter}</span>
        <span className="default-query">&</span>
        <span className="projection-query">{projection}</span>
      </pre>
    </Panel>
  )
}

Request.propTypes = {
  filter: React.PropTypes.string,
  projection: React.PropTypes.string
}