import React, {Component} from 'react';
import { Button, ButtonGroup } from 'react-bootstrap'


const ResponseOverlay = () => <div className="response-overlay"></div>


const ResponseJSON = ({loading, jsonData}) => (
  <pre>
    {loading ? 'Requesting...' : JSON.stringify(jsonData, undefined, 2)}
  </pre>
)

ResponseJSON.propTypes = {
  loading: React.PropTypes.bool,
  jsonData: React.PropTypes.object
}


const ResponseHuman = ({loading, jsonData}) => (
  <div>
    {loading ?
      'Requesting...'
      :
      <ul className="list-group">
        {jsonData.charities.map((c, i) => <div key={i} className="list-group-item">{c.name}</div>)}
      </ul>
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
        {jsonData &&
          <div className="query-response">
            {this.state.view==='JSON' ?
              <ResponseJSON loading={loading} jsonData={jsonData}/>
              :
              <ResponseHuman loading={loading} jsonData={jsonData}/>
            }
          </div>
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
