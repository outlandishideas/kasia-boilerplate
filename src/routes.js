import React, { Component } from 'react'
import { IndexRoute, Route } from 'react-router'

import {
  App,
  Page,
  NotFound
} from './containers'

const IndexPage = class extends Component {
  render () {
    return <Page {...this.props} params={{slug: "home"}} />
  }
}

export default (
  <Route path='/' component={App}>
    <IndexRoute component={IndexPage} />
    <Route path='/:slug' component={Page} />
    <Route path='/not-found' component={NotFound} status={404} />
    <Route path='*' component={NotFound} status={404} />
  </Route>
)
