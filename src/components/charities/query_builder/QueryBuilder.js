import React, {Component} from 'react';
import { Form, Row, Col, Panel, Button } from 'react-bootstrap';
import { Filters } from './Filters';
import { Projections } from './Projections';
import { Sorts } from './Sorts';
import { Pages } from './Pages';
import { Request } from './Request';

export class QueryBuilder extends Component {
  state = {
    open: true,
    selectedName: 'Filters',
    query: {
      filter: {
        'subNumber=': 0,
        'registered=': true
      },
      projection: {
        fields: {
          mainCharity: true
        }
      },
      sort: {
        sortField: 'charityNumber',
        reverse: false
      },
      page: {
        countResults: false,
        limit: 10,
        skip: 0
      }
    }
  }
  componentDidMount() {
    this.props.onFilterChange(this.filterString(this.state.query.filter))
    this.props.onProjectionChange(this.projectionString(this.state.query.projection))
    this.props.onSortChange(this.sortString(this.state.query.sort))
    this.props.onPageChange(this.pageString(this.state.query.page))
  }
  queryTypes = [
    {name: 'Filters', className: 'filter-query filter-nav'},
    {name: 'Projections', className: 'projection-query projection-nav'},
    {name: 'Sorting', className: 'sort-query sort-nav'},
    {name: 'Pagination', className: 'page-query page-nav'},
  ]
  filterString = query => {
    return Object.keys(query)
    .map(k => `${k}${query[k]}`)
    .join('&')
  }
  updateFilterState = query => {
    this.setState({query: {...this.state.query, filter: query}})
    const filterString = this.filterString(query)
    this.props.onFilterChange(filterString)
  }
  projectionString = query => {
    const commaSeparated = Object.keys(query.fields).join(',')
    return commaSeparated ? `fields=${commaSeparated}` : ''
  }
  updateProjectionState = query => {
    this.setState({query: {...this.state.query, projection: query}})
    const projectionString = this.projectionString(query)
    this.props.onProjectionChange(projectionString)
  }
  sortString = ({sortField, reverse}) => {
    return sortField===null ? '' : reverse ? `sort=-${sortField}` : `sort=${sortField}`
  }
  updateSortState = query => {
    this.setState({query: {...this.state.query, sort: query}})
    const sortString = this.sortString(query)
    this.props.onSortChange(sortString)
  }
  pageString = ({limit, skip, countResults}) => {
    const pageArray = []
    if (typeof limit === 'number') pageArray.push(`limit=${limit}`)
    if (typeof skip === 'number') pageArray.push(`skip=${skip}`)
    if (countResults) pageArray.push(`countResults`)
    return pageArray.join('&')
  }
  updatePageState = query => {
    this.setState({query: {...this.state.query, page: query}})
    const pageString = this.pageString(query)
    this.props.onPageChange(pageString)
  }
  queryComponent = (componentName) => {
    switch(componentName) {
      case 'Filters':
        return <Filters query={this.state.query.filter} onChange={this.updateFilterState} />
      case 'Projections':
        return <Projections query={this.state.query.projection} onChange={this.updateProjectionState} />
      case 'Sorting':
        return <Sorts query={this.state.query.sort} onChange={this.updateSortState} />
      case 'Pagination':
        return <Pages query={this.state.query.page} onChange={this.updatePageState} />
      default: return
    }
  }
  render() {
    return (
      <div>
        <div className="text-right">
          <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
            {this.state.open ? 'Hide Query Builder' : 'Show Query Builder'}
          </Button>
        </div>
        <Panel className="query-builder" collapsible expanded={this.state.open}>
          <Form horizontal onSubmit={this.props.onFormSubmit}>
            <Row className="query-form-container">
              <Col sm={3}>
                <ul className="nav nav-pills nav-stacked query-nav">
                  {this.queryTypes.map((q, i) => (
                    <li key={i} role="presentation" className={this.state.selectedName===q.name ? 'active' : ''}>
                      <a className={q.className} role="button" onClick={()=>this.setState({selectedName: q.name})}>{q.name}</a>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col sm={9}>
                {this.queryComponent(this.state.selectedName)}
              </Col>
            </Row>
            <hr />
            <Request
            queryStringsArray={this.props.queryStringsArray}
            outDated={this.props.outDated}
            />
          </Form>
        </Panel>
      </div>
    )
  }
}

QueryBuilder.propTypes = {
  onFilterChange: React.PropTypes.func,
  onProjectionChange: React.PropTypes.func,
  onSortChange: React.PropTypes.func,
  onPageChange: React.PropTypes.func,
  queryStringsArray: React.PropTypes.array,
  outDated: React.PropTypes.bool,
  onFormSubmit: React.PropTypes.func
}
