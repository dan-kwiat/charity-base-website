import React from 'react';
import { Row, Col, Button, Popover } from 'react-bootstrap';

const RequestPrompt = () => (
  <Popover id="popover-positioned-left" className='prompt-refresh' placement="bottom" positionTop={60}>
    Click <strong>GET</strong> to update response
  </Popover>
)


export const Request = ({queryStringsArray, outDated}) => {
  return (
    <div style={{paddingTop: '30px', paddingBottom: '30px'}}>
      <Row>
        <Col sm={3}>
          <Button className="request-button" type="submit" bsStyle="default" bsSize="large" block>GET</Button>
          {outDated ? <RequestPrompt /> : ''}
        </Col>
        <Col sm={9}>
          <pre className="query-string">
            <span className="default-query">https://charitybase.uk/api/v0.2.0/charities/?</span>
            {queryStringsArray.map((q, i) => (
              <span key={i}>
                <span className={`${q.queryType}-query`}>{q.queryString}</span>
                <span className="default-query">{i<queryStringsArray.length-1 && '&'}</span>
              </span>
            ))}
          </pre>
        </Col>
      </Row>
    </div>
  )
}

Request.propTypes = {
  queryStringsArray: React.PropTypes.array,
  outDated: React.PropTypes.bool
}