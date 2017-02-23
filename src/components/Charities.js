import React, { Component } from 'react';
import { Query } from './query'


const DemoDescription = () => (
  <div className="lead" style={{paddingTop: '20px'}}>
    <p>
      Use the <i>Query Builder</i> below to construct a GET request to the CharityBase API.
    </p>
    <p>
      For detailed instructions, see the <a href="https://github.com/tithebarn/charity-base/blob/master/api/README.md">API docs</a>.
    </p>
  </div>
)

export class Charities extends Component {
  render() {
    return (
      <div>
        <DemoDescription />
        <Query />
      </div>
    )
  }
}
