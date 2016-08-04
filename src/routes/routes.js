/**
 * # App Routes
 */

import React from 'react'
import { Route } from 'react-router'

import { Page, Post, PostsIndex } from '../containers'

const PageBySlug = Page((props) => props.params.slug)

export default [
  <Route key="0" path='/posts' component={PostsIndex} />,
  <Route key="1" path='/posts/:page' component={PostsIndex} />,
  <Route key="2" path='/:slug' component={PageBySlug} />,
  <Route key="3" path='/post/:slug' component={Post} />
]
