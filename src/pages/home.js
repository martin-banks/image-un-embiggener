import React, { Component } from 'react'
import Styled from 'styled-components'

export default class extends Component {
  render () {
    return (
      <HomeWrapper>
        <MainTitle>How to use this</MainTitle>
        <ul>
          <li>Export your images at maximum quality</li>
          <li>Choose a processing model from list on hte left</li>
          <li>Choose the folder your rawimages are in, then hit the start button</li>
          <li>Each image will be processed to resolutions and qualities in the medel settings</li>
          <li>Choose the best set of images from the output to use in production</li>
        </ul>
      </HomeWrapper>
    )
  }
}

const HomeWrapper = Styled.article`
  /* padding-top: 30vh; */
`

const MainTitle = Styled.h1`
  width: 100%;
  top: 50%;
  font-size: 6rem;
`

