import React, { Component } from 'react'
import { Link } from 'react-router'

import parse from '../../helpers/htmlParser'

import styles from './PostListing.scss'

export default function PostListing (props) {
  const { title, excerpt, slug } = props

  return (
    <li className={styles.PostListing}>
      <div className={styles.PostListing__title}>{title}</div>
      <div>{parse(excerpt)}</div>
      <Link to={`/post/${slug}`}>Read More</Link>
    </li>
  )
}
