import React, { Component } from 'react'
import { connectWpQuery } from 'kasia/connect'
import Helmet from 'react-helmet'

import { Loading, PostListing } from '../../components'
import parse from '../../helpers/htmlParser'
import query from './query'

import styles from './PostsIndex.scss'

@connectWpQuery(query)
export default class PostsIndex extends Component {
  render () {
    const { entities: { pages, posts } } = this.props.kasia

    if (!pages || !posts) {
      return <Loading />
    }

    const page = Object.values(pages)[0]

    return (
      <div className={styles.PostsIndex}>
        <Helmet title='Posts' />

        <h2 className={styles.PostListing__title}>
          {page.title}
        </h2>

        <div className={styles.PostListing__excerpt}>
          {parse(page.content)}
        </div>

        <ul className={styles.PostListings}>
          {Object.values(posts).map((post) =>
            <PostListing key={post.ID} {...post} />)}
        </ul>
      </div>
    )
  }
}
