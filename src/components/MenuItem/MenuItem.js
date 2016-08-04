import React, { Component } from 'react'
import { Link } from 'react-router'

import classNames from 'classnames'

import styles from './MenuItem.scss'

export default function MenuItem ({ item, to, active }) {
  const classes = classNames(styles.MenuItem, {
    [styles.ActiveMenuItem]: active
  })

  return (
    <li key={item.ID} className={classes}>
      <Link to={to}>{item.title}</Link>
    </li>
  )
}
