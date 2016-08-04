import React, { Component } from 'react'

import config from '../../config'

import tophatPng from '../../assets/tophat.png'
import styles from './Header.scss'

export default function Header () {
  return (
    <header className={styles.Header}>
      <img height="45" src={tophatPng} />
      <h1>{config.app.title}</h1>
    </header>
  )
}
