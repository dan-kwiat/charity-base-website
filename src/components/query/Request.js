import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export const Request = ({filter, projection}) => {
  return (
    <div style={{paddingTop: '30px', paddingBottom: '30px'}}>
      <Row>
        <Col sm={10}>
          <pre className="query-string">
            <span className="default-query">https://charitybase.uk/api/v0.2.0/charities/?</span>
            <span className="filter-query">{filter}</span>
            <span className="default-query">&</span>
            <span className="projection-query">{projection}</span>
          </pre>
        </Col>
        <Col sm={2} className="text-right">
          <Button className="request-button" type="submit" bsStyle="default" bsSize="large" block>GET</Button>
        </Col>
      </Row>
    </div>
  )
}

Request.propTypes = {
  filter: React.PropTypes.string,
  projection: React.PropTypes.string
}