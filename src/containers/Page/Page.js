import React, { Component } from 'react'
import { connectWpPost } from 'kasia/connect'
import { Page } from 'kasia/types'
import { push } from 'react-router-redux'

import './Page.scss'

@connectWpPost(Page, (props) => props.params.slug)
export default class extends Component {
  render () {
    const { query, page } = this.props.kasia

    const inner = query.complete && page
      ? <span>{page.title}</span>
      : <span>Loading...</span>

    return <div className="Page">{inner}</div>
  }

  componentWillReceiveProps (nextProps) {
    const { query, page } = nextProps.kasia

    if (query.complete && !page) {
      this.props.dispatch(push('/not-found'))
    }
  }
}
