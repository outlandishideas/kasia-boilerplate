/**
 * # Not Found Container
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import styles from './Error.scss'

export default function Error ({
  code = 500,
  message = 'Something went wrong trying to serve your request.'
}) {
  return (
    <div className={styles.Error}>
      <Helmet title='An error occurred' />
      <h2>An Error Occurred: {code}</h2>
      <p>{message}</p>
      <p>
        <a href='/'>Go to the Homepage.</a>
      </p>
    </div>
  )
}

Error.propTypes = {
  code: PropTypes.number,
  message: PropTypes.string
}
