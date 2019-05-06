import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

export default class extends Component {

  render () {
    return <Svg
      viewBox="0 0 100 100"
      width="50px"
    >
      <Circle
        cx="25"
        cy="25"
        r="25"
        stroke="red"
        stroke-width="5"
        stroke-dasharray="80"
        fill="none"
      />
    </Svg>
  }
}


const spin = keyframes`
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 500;
  }
`


const Circle = styled.circle`
  stroke: red;
  stroke-width: 5;
  stroke-dasharray: 80;
  stroke-dashoffset: 30;
  fill: none;
  animation: ${spin} 1s linear infinite;
`

const Svg = styled.svg`
  overflow: visible;
`
