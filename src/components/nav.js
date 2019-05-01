import React, { Component } from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 150px;
  height: 100vh;
  background: rgba(0,0,0, 0.2);
  padding-top: 50px;
  border-right: solid 1px rgba(255,255,255, 0.2);
`

const LinkWrapper = styled.ul`
  padding: 0;
  margin: 0;
`

const PageLink = styled.li`
  list-style: none;
  padding: 8px;
  background: ${p => p.active ? 'rgba(0,0,0, 0.2)' : 'rgba(0,0,0, 0)'};

  cursor: pointer;
  &:hover {
    background: rgba(0,0,0, 0.4);
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
          <PageLink
            onClick={ this.props.setPage.bind(null, 'home')}
            active={ this.props.active === 'home' }
          >
            Home
          </PageLink>
          <PageLink
            onClick={ this.props.setPage.bind(null, 'tips')}
            active={ this.props.active === 'tips' }
          >
            Tips
          </PageLink>
          <hr />

          <PageLink
            onClick={ this.props.setPage.bind(null, 'slider')}
            active={ this.props.active === 'slider' }
          >
            Slider
          </PageLink>
          <PageLink
            onClick={ this.props.setPage.bind(null, 'compress')}
            active={ this.props.active === 'compress' }
          >
            Compressor
          </PageLink>
        </LinkWrapper>
      </Nav>
    )
  }
}


