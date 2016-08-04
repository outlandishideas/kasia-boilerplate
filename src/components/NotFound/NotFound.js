/**
 * # Not Found Container
 */

import React from 'react'
import { Link } from 'react-router'
import Helmet from 'react-helmet'

import styles from './NotFound.scss'

export default function NotFound () {
  return (
    <div className={styles.NotFound}>
      <Helmet title='Not Found' />
      <h2>Not Found</h2>
      <p>The page you have requested was not found.</p>
      <p>
        <Link to='/'>Go to the Homepage.</Link>
      </p>
    </div>
  )
}
