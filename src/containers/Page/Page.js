/**
 * # Page Container
 */

import React, { Component, PropTypes } from 'react'
import { connectWpPost } from 'kasia/connect'
import { push } from 'react-router-redux'
import ContentTypes from 'kasia/types'
import Helmet from 'react-helmet'

import { Loading } from '../../components'
import parse from '../../helpers/htmlParser'

import styles from './Page.scss'

class Page extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  render () {
    const { page } = this.props.kasia

    let children = <Loading />

    if (page) {
      children = (
        <div>
          <Helmet title={page.title} />
          <h2>{page.title}</h2>
          {parse(page.content)}
        </div>
      )
    }

    return (
      <div className={styles.Page}>
        {children}
      </div>
    )
  }

  componentWillMount () {
    this.redirectWithoutPage(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.redirectWithoutPage(nextProps)
  }

  redirectWithoutPage (props) {
    const { query, page } = props.kasia

    if (query.complete && !page) {
      this.props.dispatch(push('/not-found'))
    }
  }
}

export default function (identifier) {
  return connectWpPost(ContentTypes.Page, identifier)(Page)
}
