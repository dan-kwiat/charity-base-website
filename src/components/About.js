import React from 'react';

export const About = () => (

  <div className="container" style={{paddingTop: '20px'}}>
    
    <div className="lead">
      <p>
        CharityBase is an open source API which provides accessable data on the finances, activities and locations of 350,000 charities and subsidiary charities in England & Wales.  It's intended for use by software developers in the charity sector as well as non-technical researchers looking for a comprehensive source of charity data.
      </p>
      <p>
        The database brings together information published by the Charity Commission in their <a href="http://data.charitycommission.gov.uk/" target="_blank">data download</a> with additional fields included in their charity search websites (<a href="http://apps.charitycommission.gov.uk/showcharity/registerofcharities/RegisterHomePage.aspx" target="_blank">original</a> and <a href="http://beta.charitycommission.gov.uk/" target="_blank">Beta</a>).  Instead of splitting betweeen many tables we present the information in a document database with one JSON document per charity.
      </p>
      <p>
        We originally needed the data to power the search engine at <a href="https://tythe.org" target="_blank">Tythe</a>.  It turned out to be a non-trivial task and we soon realised that many people faced the same challenge and were hacking their own solutions independenty.  We hope that sharing CharityBase as a standalone open source project will encourage collaboration in the Tech for Good community and enable us to collectively build some great tools for accessing and analysing charity data.
      </p>
    </div>
    <hr />

    <div className="text-right">
     <h5>Last Updated: 23 Feb 2017</h5>
     <h5>admin@charitybase.uk</h5>
     <h5><a href="https://github.com/tithebarn/charity-base">github.com/tithebarn/charity-base</a></h5>
    </div>
  </div>
)