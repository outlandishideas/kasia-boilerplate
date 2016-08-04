/**
 * # Router
 */

import React, { Component } from 'react'
import { IndexRoute, Route, Redirect } from 'react-router'

import { App, Page } from '../containers'
import { NotFound } from '../components'
import AppRoutes from './routes'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Page('homepage')} />
    <Route path='/not-found' component={NotFound} status={404} />
    {AppRoutes}
    <Redirect from='*' to='/not-found' />
  </Route>
)
