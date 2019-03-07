import React, { Component } from 'react'
import styled from 'styled-components'

import Dump from '../components/dump'
import StrategyButton from '../components/strategy-button'

const { ipcRenderer } = window.require('electron')
const fs = window.require('fs')

class Optimiser extends Component {
  constructor (props) {
    super(props)
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
      this.setState({ fileList })
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

  handleClick_chooseFolder () {
    ipcRenderer.send('open-choose-folder')
  }

  handleClick_start (model) {
    console.log({ model })
    ipcRenderer.send('start', {
      model,
      folder: this.state.folder,
      fileList: this.state.fileList,
    })
  }

  async componentDidMount () {}

  render () {
    return (
      <div>
        <h3>How to:</h3>
          <ul>
            <li>Choose a folder with the button below or press [ ⌘ + ⬆  + O ]</li>
            <li>Press the button for the approriate optimisation template</li>
            <li>Wait for the images to all be processed</li>
          </ul>

          {
            this.state.showChooseFolderButton &&
              <button onClick={ this.handleClick_chooseFolder }>Choose Folder</button>
          }

          <ButtonWrapper>
            {
              this.state.showProcessingButtons &&
                Object.keys(this.state.models)
                  .map(k =>  <StrategyButton
                    key={ `strategy-button-${k}` }
                    handleClick={ this.handleClick_start }
                    model={ k }
                    details={ this.state.models[k] }
                  />
                )
            }
          </ButtonWrapper>
  
          <hr />
          <p>STATUS: { this.state.status }</p>
  
          <hr />
  
          <Dump title="Folder" content={ this.state.folder } />
          <Dump title="Files" content={ this.state.fileList } />
          <Dump title="Logs" content={ this.state.log } />
        </div>
        )
      }
    }
    
    export default Optimiser


const ButtonWrapper = styled.div`
  display: flex;
`
