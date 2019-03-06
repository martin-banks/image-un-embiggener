import React, { Component } from 'react'
import styled from 'styled-components'

import packageDetails from '../package.json'

import Draggable from './components/draggable'
import Background from './components/background'
import Dump from './components/dump'
import StrategyButton from './components/strategy-button'

const { ipcRenderer } = window.require('electron')
const fs = window.require('fs')


class App extends Component {
  constructor () {
    super()

    this.state = {
      folder: null,
      fileList: [],
      fileContent: [],
      foundImages: [],
      log: [],
      status: 'Innactive',
      models: {},
      showProcessingButtons: false,
      showChooseFolderButton: true,
    }

    this.handleClick_start = this.handleClick_start.bind(this)

    ipcRenderer.on('new-file', (e, content) => {
      console.log({ content })
      this.setState({ fileContent: content })
    })

    ipcRenderer.on('chosen-folder', (e, folderPath) => {
      console.log({ folderPath })
      this.setState({ folder: folderPath })
      const fileList = folderPath
        ? fs
          .readdirSync(folderPath)
          .toString()
          .split(',')
          .filter(f => f.match(/.jpe?g|.png|.gif/))
        : []

      // const images = {
      //   jpg: fileList.filter(f => f.match(/.jpe?g/)),
      //   png: fileList.filter(f => f.match(/.png/)),
      //   gif: fileList.filter(f => f.match(/.gif/)),
      // }
      this.setState({
        fileList,
        // showProcessingButtons: true,
        // showChooseFolderButton: false,
      })
    })

    ipcRenderer.on('found-images', (e, content) => {
      console.log({ content })
      this.setState({ foundImages: content })
    })

    ipcRenderer.on('status', (e, content) => {
      this.setState({
        status: content,
        showChooseFolderButton: content.toLowerCase() === 'innactive',
        showProcessingButtons: content.toLowerCase() !== 'innactive' && content.toLowerCase() !== 'processing',
      })
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

  handleClick_start (model) {
    console.log({ model })
    ipcRenderer.send('start', {
      model,
      folder: this.state.folder,
      fileList: this.state.fileList,
    })
  }

  handleClick_chooseFolder () {
    ipcRenderer.send('open-choose-folder')
  }

  render () {
    return (
      <div className="App">
        <Background />
        <Draggable />
        {/* <h1>Image Un-Embiggener</h1> */}

        <Version>version: { packageDetails.version }</Version>

        <h3>How to:</h3>
        <ul>
          <li>Choose a folder with the button below or press [ ⌘ + ⬆  + O ]</li>
          <li>Press the button for the approriate optimisation template</li>
          <li>Wait for the images to all be processed</li>
        </ul>

        {/* <h4>Choose a strategy</h4>
        <div className="models">
        {
          Object.keys(this.state.models)
          .map(k => <button>{ k }</button>)
        }
      </div> */}

        <hr />
        <p>STATUS: { this.state.status }</p>

        {
          this.state.showChooseFolderButton &&
            <button onClick={ this.handleClick_chooseFolder }>Choose Folder</button>
        }
        {
          // this.state.showProcessingButtons &&
          //   <button onClick={ this.handleClick_start.bind(null, 'foo') }>Run demo optimiser</button>
        }
        {/* {
          this.state.showProcessingButtons &&
            Object.keys(this.state.models)
              .map(key => <button onClick={ this.handleClick_start.bind(null, key) }>{ key }</button>)
        } */}

        <ButtonWrapper>
          {
            this.state.showProcessingButtons &&
              Object.keys(this.state.models)
                .map(k =>  <StrategyButton
                  handleClick={ this.handleClick_start }
                  model={ k }
                  details={ this.state.models[k] }
                />
              )
          }
        </ButtonWrapper>
       


        <hr />

        <Dump
          title="Folder"
          content={ this.state.folder }
        />
        <Dump
          title="Files"
          content={ this.state.fileList }
        />
        <Dump
          title="Logs"
          content={ this.state.log }
        />
        {/* <Dump
          title="File content"
          content={ this.state.fileContent }
        /> */}

      </div>
    )
  }
}


export default App


const ButtonWrapper = styled.div`
  display: flex;
`

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
