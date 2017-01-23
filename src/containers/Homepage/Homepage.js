
import React, { Component, PropTypes } from 'react'
import { connectWpPost } from 'kasia/connect'
import ContentTypes from 'kasia/types'
import Helmet from 'react-helmet'

import { Loading } from '../../components'
import parse from '../../helpers/htmlParser'

import styles from './Homepage.scss'

@connectWpPost(ContentTypes.Page, 'homepage')
export default class Homepage extends Component {
    static propTypes = {
        params: PropTypes.object
    }

    render () {
        const { page } = this.props.kasia

        let children = <Loading />

        if (page) {
            children = (
                <div>
                    <Helmet title={page.title} />
                    <h2>{page.title}</h2>
                    {parse(page.content.rendered)}
                </div>
            )
        }

        return (
            <div className={styles.Page}>
                {children}
            </div>
        )
    }

}