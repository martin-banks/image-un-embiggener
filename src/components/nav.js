import React, { Component } from 'react'
import styled from 'styled-components'

class Nav extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <nav>
        <ul>
          <li onClick={ this.props.setPage.bind(null, 'optimiser')}>Optimiser</li>
          <li onClick={ this.props.setPage.bind(null, 'tips')}>Tips</li>
        </ul>
      </nav>
    )
  }
}

export default Nav
