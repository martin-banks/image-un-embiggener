import React, { Component } from 'react'
import styled from 'styled-components'

import packageDetails from '../package.json'

import Draggable from './components/draggable'
import Background from './components/background'
import Nav from './components/nav'
import Dump from './components/dump'
import Version from './components/version'

import Home from './pages/home'
import TipsFileTypes from './pages/tips-filetypes'
import Processing from './pages/processing'
import ColorPalette from './pages/image-palette'

import Spinner from './components/spinner'

const { ipcRenderer } = window.require('electron')
// const fs = window.require('fs')


class App extends Component {
  constructor () {
    super()

    this.state = {
      page: 'compress',
      fileData: [],
      log: [],
      showLogs: false,
      releases: null,
      update: false,
    }

    ipcRenderer.on('log', (e, content) => {
      const log = this.state.log
      log.push(content)
      this.setState({ log })
    })

    this.handleSetpage = this.handleSetpage.bind(this)
    this.toggleLogs = this.toggleLogs.bind(this)
  }

  handleSetpage (page) {
    console.log('click!')
    this.setState({ page })
    console.log(this.state.page)
  }
  toggleLogs () {
    this.setState(prevState => prevState.showLogs = !prevState.showLogs)
  }

  componentDidMount () {
    // /repos/:owner/:repo/releases/latest
    fetch('https://api.github.com/repos/martin-banks/image-un-embiggener/releases/latest')
      .then(res => res.json())
      .then(data => {
        this.setState({ releases: data })
        const releaseVersion = data.name.split('.')
        const thisVersion =  packageDetails.version.split('.')
        console.log({ thisVersion, releaseVersion})
        console.log(thisVersion > releaseVersion)

        let i = 0
        for (const num of releaseVersion) {
          console.log(num, thisVersion[i], num > thisVersion[i])
          if (num > thisVersion[i]) {
            // new version available!
            this.setState({ update: true })
            break
          }
          i++
        }
      })
      .catch(console.error)
  }

  render () {
    return (
      <div className="App">
        <Background />
        <Draggable />
        <Nav setPage={ this.handleSetpage } active={ this.state.page } />
        <PageWrapper>
          { this.state.page === 'home' && <Home /> }
          { this.state.page === 'tips' && <TipsFileTypes /> }

          { this.state.page === 'compress' && <Processing model='compress' /> }
          { this.state.page === 'common' && <Processing model='common' /> }
          { this.state.page === 'slider' && <Processing model='slider' /> }
          { this.state.page === 'color-palette' && <ColorPalette model='color-palette' /> }

          <LogButton onClick={ this.toggleLogs }>{ this.state.showLogs ? 'Hide' : 'Show' } logs</LogButton>
          {
            this.state.showLogs
              && <Dump title="" content={ this.state.log } />
          }
        </PageWrapper>

        <Version>
          version: { packageDetails.version }
          {
            // https://github.com/electron/electron/blob/master/docs/api/shell.md#shellopenexternalurl
            // docs on opening links in browser
            this.state.update && <>
              <p>Update avialable</p>
              <a href="https://github.com/martin-banks/image-un-embiggener/releases/" target="_blank">Download the update here</a>
            </>
          }
          
        </Version>

      </div>
    )
  }
}

export default App


const PageWrapper = styled.article`
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
`

const LogButton = styled.button`
  padding: 8px 6px;
  background: none;
  color: white;
  border-radius: 0;
  text-align: left;
  border: none;
`
