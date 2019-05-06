import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pathLength: 0,
    }
    this.pathRef = React.createRef()
  }

  componentDidMount () {
    this.setState({ pathLength: this.pathRef.current.getTotalLength() })
  }


  render () {
    return <Svg
      viewBox="0 0 100 100"
      width="50px"
    >
      <Circle
        cx="50"
        cy="50"
        r="50"
        fill="none"
        ref={ this.pathRef }
        pathLength={ this.state.pathLength}
      />
    </Svg>
  }
}

function spin (length) {
  return keyframes`
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: ${length * -1};
    }
  `
}


const Circle = styled.circle`
  stroke: gold;
  stroke-width: 6;
  stroke-dasharray: 80;
  stroke-dashoffset: ${p => p.pathLength};
  fill: none;
  animation: ${p => spin(p.pathLength)} 1s linear infinite;
`

const Svg = styled.svg`
  margin: 3rem auto;
  overflow: visible;
`
