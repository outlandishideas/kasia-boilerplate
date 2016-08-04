import React, { Component } from 'react'
import { connectWpPost } from 'kasia/connect'
import ContentTypes from 'kasia/types'

import { Loading } from '../../components'
import parse from '../../helpers/htmlParser'

import styles from './Post.scss'

@connectWpPost(ContentTypes.Post, (props) => props.params.slug)
export default class Post extends Component {
  render () {
    const { post } = this.props.kasia

    if (!post) {
      return <Loading />
    }

    return (
      <div className={styles.Post}>
        <h2>{post.title}</h2>
        {parse(post.content)}
      </div>
    )
  }
}
