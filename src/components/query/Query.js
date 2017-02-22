import React, { Component } from 'react';
import { Filters } from './Filters';
import { Projections } from './Projections';
import { Row, Col, Panel } from 'react-bootstrap';
import { loadCharities } from '../../lib/charitiesService';

const QueryBuilder = ({onFilterChange, onProjectionChange}) => {
  return (
    <Panel collapsible defaultExpanded header="Query Builder">
      <Row>
        <Col xs={6}><Filters onChange={onFilterChange} /></Col>
        <Col xs={6}><Projections onChange={onProjectionChange} /></Col>
      </Row>
    </Panel>
  )
}

QueryBuilder.propTypes = {
  onFilterChange: React.PropTypes.func,
  onProjectionChange: React.PropTypes.func
}

export class Query extends Component {
  state = {
    queryStrings: {
      filter: '',
      projection: ''
    },
    response: {},
    loading: false
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.queryStrings!==this.state.queryStrings) {
      this.setState({loading: true})
      loadCharities(this.state.queryStrings)
      .then(response => {
        this.setState({loading:false, response})
      })
    }
  }
  updateQueryStrings = (queryType, value) => {
    this.setState((prevState) => {
      const queryStrings = {...prevState.queryStrings}
      queryStrings[queryType] = value
      return {queryStrings}
    })
  }
  render() {
    const {filter, projection} = this.state.queryStrings
    return (
      <div style={{paddingTop: '50px'}}>
        <QueryBuilder
        onFilterChange={this.updateQueryStrings.bind(null, 'filter')}
        onProjectionChange={this.updateQueryStrings.bind(null, 'projection')}
        />
        <code>
          <span className="filter-query">{filter}</span>
          <span style={{color:'#aaa'}}>&</span>
          <span className="projection-query">{projection}</span>
        </code>
        <pre>
          {this.state.loading ? 'Loading...' : JSON.stringify(this.state.response, undefined, 2)}
        </pre>
      </div>
    )
  }
}