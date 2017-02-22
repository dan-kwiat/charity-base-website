import React from 'react';

export const Request = ({filter, projection}) => {
  return (
    <code>
      <span className="filter-query">{filter}</span>
      <span style={{color:'#aaa'}}>&</span>
      <span className="projection-query">{projection}</span>
    </code>
  )
}

Request.propTypes = {
  filter: React.PropTypes.string,
  projection: React.PropTypes.string
}