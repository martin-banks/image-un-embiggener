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
            className={ this.props.active === 'home' ? 'activePage' : '' }
          >
            Home
          </PageLink>
          {/* <PageLink
            onClick={ this.props.setPage.bind(null, 'tips')}
            active={ this.props.active === 'tips' }
            className={ this.props.active === 'tips' ? 'activePage' : '' }
          >
            Tips
          </PageLink> */}
          <hr />

          <PageLink
            onClick={ this.props.setPage.bind(null, 'compress')}
            active={ this.props.active === 'compress' }
            className={ this.props.active === 'compress' ? 'activePage' : '' }
          >
            Compressor
          </PageLink>
          <PageLink
            onClick={ this.props.setPage.bind(null, 'common')}
            active={ this.props.active === 'common' }
            className={ this.props.active === 'common' ? 'activePage' : '' }
          >
            Common sizes
          </PageLink>
          <PageLink
            onClick={ this.props.setPage.bind(null, 'slider')}
            active={ this.props.active === 'slider' }
            className={ this.props.active === 'slider' ? 'activePage' : '' }
          >
            Slider
          </PageLink>
          <PageLink
            onClick={ this.props.setPage.bind(null, 'palette')}
            active={ this.props.active === 'palette' }
            className={ this.props.active === 'palette' ? 'activePage' : '' }
          >
            Colour palette
          </PageLink>
        </LinkWrapper>
      </Nav>
    )
  }
}


