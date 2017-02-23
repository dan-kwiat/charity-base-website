import React from 'react';
import { Panel } from 'react-bootstrap';

const ResponseOverlay = () => (
  <div style={{
    position: 'absolute',
    left:'0',
    right:'0',
    top:'0',
    bottom:'0',
    backgroundColor: 'rgba(255,255,255,0.8)',
  }}>
  </div>
)


export const Response = ({loading, outDated, jsonData}) => {
  return (
    <Panel collapsible defaultExpanded header="JSON Response" style={{position:'relative'}}>
      {outDated ? <ResponseOverlay/> : ''}
      <pre className="query-response">
        {loading ? 'Requesting...' : JSON.stringify(jsonData, undefined, 2)}
      </pre>
    </Panel>
  )
}

Response.propTypes = {
  loading: React.PropTypes.bool,
  outDated: React.PropTypes.bool,
  jsonData: React.PropTypes.object
}