import React from 'react';

const ResponseOverlay = () => <div className="response-overlay"></div>

export const Response = ({loading, outDated, jsonData}) => {
  return (
    <div style={{position:'relative'}}>
      {outDated ? <ResponseOverlay/> : ''}
      <pre className="query-response">
        {loading ? 'Requesting...' : JSON.stringify(jsonData, undefined, 2)}
      </pre>
    </div>
  )
}

Response.propTypes = {
  loading: React.PropTypes.bool,
  outDated: React.PropTypes.bool,
  jsonData: React.PropTypes.object
}