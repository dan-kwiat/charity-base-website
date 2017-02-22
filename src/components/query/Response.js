import React from 'react';

export const Response = ({loading, jsonData}) => {
  return (
    <pre>
      {loading ? 'Loading...' : JSON.stringify(jsonData, undefined, 2)}
    </pre>
  )
}

Response.propTypes = {
  loading: React.PropTypes.bool,
  jsonData: React.PropTypes.object
}