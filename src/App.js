import React, { Component } from 'react'
import './App.css'

const { ipcRenderer } = window.require('electron')

class App extends Component {
  constructor () {
    super()

    this.state = {
      fileContent: null
    }

    ipcRenderer.on('new-file', (e, content) => {
      console.log({ content })
      this.setState({ fileContent: content })
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Image un-embiggenning</h1>
        <p>Choose a folder from the file/open menu</p>

        <p>{ this.state.fileContent }</p>
      </div>
    )
  }
}

export default App
