import React, { Component } from 'react'
import styled from 'styled-components'

import Draggable from './components/draggable'
import Background from './components/background'
import Dump from './components/dump'

const { ipcRenderer } = window.require('electron')
const fs = window.require('fs')


class App extends Component {
  constructor () {
    super()

    this.state = {
      folder: null,
      fileList: null,
      fileContent: null,
      foundImages: null,
      log: [],
      status: 'Innactive',
      models: {},
    }

    this.handleClick_start = this.handleClick_start.bind(this)

    ipcRenderer.on('new-file', (e, content) => {
      console.log({ content })
      this.setState({ fileContent: content })
    })

    ipcRenderer.on('chosen-folder', (e, folderPath) => {
      console.log({ folderPath })
      this.setState({ folder: folderPath })
      const fileList = fs
        .readdirSync(folderPath)
        .toString()
        .split(',')
        .filter(f => f.match(/.jpe?g|.png|.gif/))

      // const images = {
      //   jpg: fileList.filter(f => f.match(/.jpe?g/)),
      //   png: fileList.filter(f => f.match(/.png/)),
      //   gif: fileList.filter(f => f.match(/.gif/)),
      // }
      this.setState({ fileList })
    })

    ipcRenderer.on('found-images', (e, content) => {
      console.log({ content })
      this.setState({ foundImages: content })
    })

    ipcRenderer.on('status', (e, content) => {
      this.setState({ status: content })
    })

    ipcRenderer.on('log', (e, content) => {
      const log = this.state.log
      log.push(content)
      this.setState({ log })
    })

    ipcRenderer.on('models', (e, models) => {
      console.log('models recieved')
      this.setState({ models })
    })
  }

  handleClick_start () {
    ipcRenderer.send('start', {
      folder: this.state.folder,
      fileList: this.state.fileList,
    })
  }

  render () {
    return (
      <div className="App">
        <Background />
        <Draggable />
        <h1>Image Un-Embiggener</h1>

        <h3>Choose a folder from the file/open menu [ ⌘ + ⬆  + O ]</h3>

        {/* <h4>Choose a strategy</h4>
        <div className="models">
        {
          Object.keys(this.state.models)
          .map(k => <button>{ k }</button>)
        }
      </div> */}

        {
          this.state.fileList &&
            <button onClick={ this.handleClick_start }>Start</button>
        }

        {/*
          this.state.foundImages && Object.keys(this.state.foundImages)
            .map(k => {
              return this.state.foundImages[k].map(file => {
                return <img src={ `file:/${this.state.folder}/${file}` } alt=""/>
              })
            })
          */}

        <p>{ this.state.fileContent }</p>

        <hr />
        <p>{ this.state.status }</p>

        <Dump
          title="Folder"
          data={ this.state.folder }
        />
        <Dump
          title="Files"
          data={ this.state.fileList }
        />
        <Dump
          title="Logs"
          data={ this.state.log }
        />

      </div>
    )
  }
}


export default App
