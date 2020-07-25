import React, { Fragment } from 'react'
import { Header, Image } from 'semantic-ui-react'

const NotFound = () => (
  <Fragment>
      <div className="ui grid middle aligned segment green inverted" style="height: 100%; margin: 0;">
  <div className="ui column center aligned">
    <div className="ui inverted statistic">
      <div className="value">404</div>
      <div className="label">Error</div>
    </div>

    <div className="ui message green inverted">
      <div className="header">Description</div>
      <p>Not found</p>
    </div>
  </div>
</div>
  </Fragment>
)

export default NotFound
