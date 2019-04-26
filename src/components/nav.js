import React, { Component } from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 150px;
  height: 100vh;
  background: rgba(0,0,0, 0.2);
  padding: 8px;
  padding-top: 50px;
  border-right: solid 1px rgba(255,255,255, 0.2)
`

const LinkWrapper = styled.ul`
  padding: 0;
  margin: 0;
`

const PageLink = styled.li`
  list-style: none;
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background: rgba(0,0,0, 0.2);
  }
`

export default class extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Nav>
        <LinkWrapper>
          <PageLink onClick={ this.props.setPage.bind(null, 'optimiser')}>Optimiser</PageLink>
          <PageLink onClick={ this.props.setPage.bind(null, 'tips')}>Tips</PageLink>
        </LinkWrapper>
      </Nav>
    )
  }
}


