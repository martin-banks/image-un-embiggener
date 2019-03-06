import React, { Component } from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'


class StrategyButton extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return(
      <Wrapper>
        <Title>{ this.props.model }</Title>
        <p>{ this.props.details.info.description || 'nope' }</p>
        <StartButton onClick={ this.props.handleClick.bind(null, this.props.model) }>Start</StartButton>
      </Wrapper>
    )
  }
}

export default StrategyButton


StrategyButton.propTypes = {
  model: PropTypes.string,
  handleClick: PropTypes.func,
  details: PropTypes.object,
}

const Wrapper = Styled.div`
  position: relative;
  background: rgba(0,0,0, 0.2);
  color: white;
  border: solid 1px rgba(255,255,255, 0.4);
  border-radius: 4px;
  padding: 1rem;
  color: white;
  margin: 1rem 0;
  margin-right: 2rem;
`

const Title = Styled.h4`
  display: block;
  color: white;
  &:first-letter {
    text-transform: uppercase;
  }
`

const StartButton = Styled.button`
  display: block;
  flex: 1 1 0;
  width: 100%;
  min-width: 300px;
  width: 100%;
  background: none;
  border-radius: 4px;
  font-size: 2rem;
  padding: 1rem 2rem;
  background: rgba(0,0,0, 0.8);
  color: white;
  &:hover {
    background: gold;
    color: #333;
  }
`

