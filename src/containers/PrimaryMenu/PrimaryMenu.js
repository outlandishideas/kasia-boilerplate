/**
 * # Primary Menu Component
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { MenuItem } from '../../components'
import config from '../../config'

import styles from './PrimaryMenu.scss'

const getSlug = (url) => {
  return url.replace(config.wordpress, '')
}

const getMenu = (state) => (
  state.wordpress.menuLocations
  && state.wordpress.menuLocations.primary
  || []
)

@connect((state) => ({ menu: getMenu(state) }))
export default class PrimaryMenu extends Component {
  static propTypes = {
    activePathName: PropTypes.string.isRequired
  }

  render () {
    const { menu, activePathName } = this.props

    return (
      <ul className={styles.PrimaryMenu}>
        {menu.map((item) => {
          const slug = getSlug(item.url)
          const active = slug === activePathName
          return <MenuItem key={slug} item={item} active={active} to={slug} />
        })}
      </ul>
    )
  }
}
