/**
 * Get the page with slug 'posts' and all Post content items.
 * @param {Object} wpapi WP-API interface
 * @param {Object} props Component's props
 * @returns {Promise}
 */
export default function PostsListingQuery (wpapi, props) {
  let page = typeof props.params.page !== 'undefined'
    ? Number(props.params.page)
    : false

  page = page >= 2 ? page : false

  const postsQuery = page
    ? wpapi.posts().page(page)
    : wpapi.posts()

  const promises = [
    wpapi.pages().slug('posts').get(),
    postsQuery.perPage(5).get()
  ]

  return Promise
    .all(promises)
    .then((results) => [].concat(...results))
}
