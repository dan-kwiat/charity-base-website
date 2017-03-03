import React, {Component} from 'react';
import { Row, Col, Panel, Button } from 'react-bootstrap';
import { Filters } from './Filters';
import { Projections } from './Projections';
import { Sorts } from './Sorts';
import { Pages } from './Pages';

export class QueryBuilder extends Component {
  state = {
    open: true,
    selectedName: 'Filters'
  }
  queryTypes = [
    {name: 'Filters', className: 'filter-query'},
    {name: 'Projections', className: 'projection-query'},
    {name: 'Sorting', className: 'sort-query'},
    {name: 'Pagination', className: 'page-query'},
  ]
  queryComponent = (componentName) => {
    const { onFilterChange, onProjectionChange, onSortChange, onPageChange } = this.props
    switch(componentName) {
      case 'Filters':
        return <Filters onChange={onFilterChange} />
      case 'Projections':
        return <Projections onChange={onProjectionChange} />
      case 'Sorting':
        return <Sorts onChange={onSortChange} />
      case 'Pagination':
        return <Pages onChange={onPageChange} />
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
          <Row>
            <Col sm={4}>
              <ul className="nav nav-pills nav-stacked">
                {this.queryTypes.map((q, i) => (
                  <li key={i} role="presentation" className={this.state.selectedName===q.name ? 'active' : ''}>
                    <a className={q.className} role="button" onClick={()=>this.setState({selectedName: q.name})}>{q.name}</a>
                  </li>
                ))}
              </ul>
            </Col>
            <Col sm={8}>
              {this.queryComponent(this.state.selectedName)}
            </Col>
          </Row>
        </Panel>
      </div>
    )
  }
}

QueryBuilder.propTypes = {
  onFilterChange: React.PropTypes.func,
  onProjectionChange: React.PropTypes.func,
  onSortChange: React.PropTypes.func,
  onPageChange: React.PropTypes.func
}
