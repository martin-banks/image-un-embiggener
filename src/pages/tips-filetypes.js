import React, { Component } from 'react'
import styled from 'styled-components'
import Markdown from 'react-markdown'

import mdFile from '../tips/filetypes.md'


class TipsFileTypes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: 'Loading',
    }
  }

  async componentDidMount () {
    fetch(mdFile)
      .then((response) => response.text()).then((text) => {
      this.setState({ file: text })
    })
  }

  render () {
    return (
      <Markdown source={ this.state.file } />
    )
  }
}

export default TipsFileTypes
