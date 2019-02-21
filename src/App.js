import React, { Component } from 'react'
import './App.css'
import styled from 'styled-components'

const { ipcRenderer } = window.require('electron')

class App extends Component {
  constructor () {
    super()

    this.state = {
      fileContent: null,
      foundImages: {},
    }

    ipcRenderer.on('new-file', (e, content) => {
      console.log({ content })
      this.setState({ fileContent: content })
    })

    ipcRenderer.on('found-images', (e, content) => {
      console.log({ content })
      this.setState({ foundImages: content })
    })
  }

  render() {
    return (
      <div className="App">
        <Background />
        <Draggable />
        <h1>Image Un-Embiggener</h1>
        <p>Choose a folder from the file/open menu</p>

        <p>{ this.state.fileContent }</p>
        <pre>{
          JSON.stringify(this.state.foundImages, 'utf8', 2)
        }</pre>
      </div>
    )
  }
}


const Background = styled.div`
  background: linear-gradient(#333, #222);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
`

const Draggable = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0, 0.2);
  width: 100vw;
  height: 40px;
  z-index: 10000;
`


export default App
