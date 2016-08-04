/**
 * # App Container
 */

import React, { Component } from 'react'
import Helmet from 'react-helmet'

import { Header } from '../../components'
import { PrimaryMenu } from '../index'
import config from '../../config'

import styles from './App.scss'

export default class App extends Component {
  render () {
    const { pathname } = this.props.location

    return (
      <div className={styles.App}>
        <Helmet {...config.app.head}/>

        <Header />

        <PrimaryMenu activePathName={pathname} />

        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
