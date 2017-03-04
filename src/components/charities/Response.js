import React, {Component} from 'react';
import { Button, ButtonGroup, ListGroup, ListGroupItem, Badge } from 'react-bootstrap'


const ResponseOverlay = () => <div className="response-overlay"></div>


const ResponseJSON = ({loading, jsonData}) => (
  <pre className="query-response">
    {loading ? 'Requesting...' : JSON.stringify(jsonData, undefined, 2)}
  </pre>
)

ResponseJSON.propTypes = {
  loading: React.PropTypes.bool,
  jsonData: React.PropTypes.object
}

const Charity = ({c}) => (
  <div>
    <h4>
      {c.name}
      <small>
        {c.registered
          ? <span> <Badge className="projection-form">registered</Badge></span>
          : <span> <Badge className="filter-form">de-registered</Badge></span>
        }
      </small>
    </h4>
    <h5>
      Charity Number: {c.charityNumber}
      <small>{c.subNumber>0 ? ` (subsidiary ${c.subNumber})` : ''}</small>
    </h5>
  </div>
)

Charity.propTypes = {
  c: React.PropTypes.object
}

const ResponseHuman = ({loading, jsonData}) => (
  <div className="query-response">
    {loading ?
      'Requesting...'
      :
      <ListGroup>
        {jsonData.charities.length>0
          ? jsonData.charities.map((c, i) => (
              <ListGroupItem key={i}>
                <Charity c={c} />
              </ListGroupItem>
            ))
          : "No results with requested filters."
        }
      </ListGroup>
    }
  </div>
)

ResponseHuman.propTypes = {
  loading: React.PropTypes.bool,
  jsonData: React.PropTypes.object
}


export class Response extends Component {
  state = {
    view: 'JSON'
  }
  render() {
    const {loading, outDated, jsonData} = this.props
    return (
      <div style={{position: 'relative'}}>
        {outDated ? <ResponseOverlay/> : ''}

        <div className="text-center" style={{paddingBottom: '20px'}}>
          <ButtonGroup>
            <Button
            className={this.state.view==='Human' ? 'active' : ''}
            onClick={() => this.setState({view: 'Human'})}
            >
              Human
            </Button>
            <Button
            className={this.state.view==='JSON' ? 'active' : ''}
            onClick={() => this.setState({view: 'JSON'})}
            >
              JSON
            </Button>
          </ButtonGroup>
        </div>
        {this.state.view==='JSON' ?
          <ResponseJSON loading={loading} jsonData={jsonData}/>
          :
          <ResponseHuman loading={loading} jsonData={jsonData}/>
        }
      </div>
    )
  }
}

Response.propTypes = {
  loading: React.PropTypes.bool,
  outDated: React.PropTypes.bool,
  jsonData: React.PropTypes.object
}
