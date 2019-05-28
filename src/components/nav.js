import React, { Component } from 'react'
import styled from 'styled-components'

const commonWidths = require('../image-models/common/index').imageWidths


const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
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
  position: relative;
  list-style: none;
  padding: 2rem;
  background: ${p => p.active ? 'rgba(0,0,0, 0.2)' : 'rgba(0,0,0, 0)'};

  cursor: pointer;
  &:hover {
    background: rgba(0,0,0, 0.4);
  }
`

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showCommonWidths: false,
    }

    this.toggleCommonWidths = this.toggleCommonWidths.bind(this)
  }

  toggleCommonWidths () {
    this.setState({ showCommonWidths: !this.state.showCommonWidths })
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
            How to
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
            onClick={ this.props.setPage.bind(null, 'compress') }
            active={ this.props.active === 'compress' }
            className={ this.props.active === 'compress' ? 'activePage' : '' }
          >
            Compressor
          </PageLink>

          <PageLink
            onClick={ this.props.setPage.bind(null, 'slider')}
            active={ this.props.active === 'slider' }
            className={ this.props.active === 'slider' ? 'activePage' : '' }
          >
            Slider
          </PageLink>

          <PageLink
            onClick={ this.props.setPage.bind(null, 'common') }
            active={ this.props.active === 'common' }
            className={ this.props.active === 'common' ? 'activePage' : '' }
          >
            <Beta />
            Common widths
          </PageLink>

          {/* <PageLink
            onClick={ this.toggleCommonWidths }
            active={ this.state.showCommonWidths }
            className={ this.state.showCommonWidths ? 'activePage' : '' }
          >
            Common widths
          </PageLink>

          {
            this.state.showCommonWidths && commonWidths.map(w => <PageLink
                key={ `link-common-width-${w}` }
                onClick={ this.props.setPage.bind(null, `common-${w}`)}
                active={ this.props.active === `common-${w}` }
                className={ this.props.active === 'common' ? 'activePage' : '' }
              >
                { w }px wide
              </PageLink>
            )
          } */}

          <PageLink
            onClick={ this.props.setPage.bind(null, 'color-palette')}
            active={ this.props.active === 'color-palette' }
            className={ this.props.active === 'color-palette' ? 'activePage' : '' }
          >
            <Beta />
            Colour palette
          </PageLink>
        </LinkWrapper>
      </Nav>
    )
  }
}

const Beta = styled.label`
  position: absolute;
  top: 0;
  left: 2rem;
  height: 1.5rem;
  background: darkred;
  color: white;
  font-weight: 800;
  padding: 1.5px 4px 0 4px;
  margin: 0;
  overflow: hidden;
  font-size: 1.5rem;
  line-height: 1.5rem;
  /* transform: rotate(-15deg) translate(-100%, 50%); */
  border-radius: 4px;
  :before {
    content: 'BETA';
  }
`
