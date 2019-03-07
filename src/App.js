import React, { Component } from 'react'
import styled from 'styled-components'

import packageDetails from '../package.json'

import Draggable from './components/draggable'
import Background from './components/background'
import Nav from './components/nav'
// import Dump from './components/dump'
// import StrategyButton from './components/strategy-button'

import TipsFileTypes from './pages/tips-filetypes'
import Optimiser from './pages/optimiser'

const { ipcRenderer } = window.require('electron')
const fs = window.require('fs')


class App extends Component {
  constructor () {
    super()

    this.state = {
      // folder: null,
      // fileList: [],
      // fileContent: [],
      // foundImages: [],
      // log: [],
      // status: 'Innactive',
      // models: {},
      // showProcessingButtons: false,
      // showChooseFolderButton: true,

      page: 'optimiser',
    }

    this.handleSetpage = this.handleSetpage.bind(this)
  }

  handleSetpage (page) {
    console.log('click!')
    this.setState({ page })
    console.log(this.state.page)
  } 


  render () {
    return (
      <div className="App">
        <Background />
        <Draggable />
        <Nav setPage={ this.handleSetpage }/>

        { this.state.page === 'tips' && <TipsFileTypes /> }
        { this.state.page === 'optimiser' && <Optimiser /> }

        <Version>version: { packageDetails.version }</Version>

      </div>
    )
  }
}


export default App

const Version = styled.span`
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem 2rem;
  background: rgba(0,0,0, 0.4);
  font-family: monospace;
  font-weight: 600;
  color: #bada55;
  opacity: 0.5;
  margin: 1rem;
  border-radius: 0.5rem;
`
