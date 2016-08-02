import React, { Component } from 'react'

import './App.scss'

export default class extends Component {
  render () {
    return (
      <div className="App">
        <h1>Kasia Boilerplate</h1>
        {this.props.children}
      </div>
    )
  }
}
