import React from 'react';
import { Row, Col, Button, Popover } from 'react-bootstrap';

const RequestPrompt = () => (
  <Popover
  id="popover-positioned-left"
  placement="bottom"
  positionTop={60}
  >
    Click <strong>GET</strong> to update response
  </Popover>
)


export const Request = ({filter, projection, sort, page, outDated}) => {
  return (
    <div style={{paddingTop: '30px', paddingBottom: '30px'}}>
      <Row>
        <Col sm={10}>
          <pre className="query-string">
            <span className="default-query">https://charitybase.uk/api/v0.2.0/charities/?</span>
            <span className="filter-query">{filter}</span>
            <span className="default-query">&</span>
            <span className="projection-query">{projection}</span>
            <span className="default-query">&</span>
            <span className="sort-query">{sort}</span>
            <span className="default-query">&</span>
            <span className="page-query">{page}</span>
          </pre>
        </Col>
        <Col sm={2} className="text-right">
          <Button className="request-button" type="submit" bsStyle="default" bsSize="large" block>GET</Button>
          {outDated ? <RequestPrompt /> : ''}
        </Col>
      </Row>
    </div>
  )
}

Request.propTypes = {
  filter: React.PropTypes.string,
  projection: React.PropTypes.string,
  sort: React.PropTypes.string,
  page: React.PropTypes.string,
  outDated: React.PropTypes.bool
}