import React from 'react';
import { Panel } from 'react-bootstrap';

export const Response = ({loading, jsonData}) => {
  return (
    <Panel collapsible defaultExpanded header="JSON Response">
      <pre className="query-response">
        {loading ? 'Loading...' : JSON.stringify(jsonData, undefined, 2)}
      </pre>
    </Panel>
  )
}

Response.propTypes = {
  loading: React.PropTypes.bool,
  jsonData: React.PropTypes.object
}