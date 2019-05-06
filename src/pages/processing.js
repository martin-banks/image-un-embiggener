import React, { Component } from 'react'
import styled from 'styled-components'
import Markdown from 'react-markdown'

import Dump from '../components/dump'
import PageHeader from '../components/page-header'
import Spinner from '../components/spinner'

// import readme from '../image-models/slider/README.md'

const { ipcRenderer } = window.require('electron')
const fs = window.require('fs')


class Optimiser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      folder: null,
      fileList: [],
      fileData: [],
      fileContent: [],
      foundImages: [],
      log: [],
      status: 'Waiting for folder',
      models: {},
      showProcessingButtons: false,
      showChooseFolderButton: true,
      readme: null,
      showReadme: false,
      showSpinner: false
    }
    this.handleClick_start = this.handleClick_start.bind(this)
    this.toggleReadme = this.toggleReadme.bind(this)
    this.fileSize = this.fileSize.bind(this)

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
          .filter(f => f.match(/\.jpe?g|\.png|\.gif/))
        : []

      this.setState({ fileList: [], fileData: [] })
      this.setState({ fileList })

      fileList.forEach(file => {
        fs.stat(`${folderPath}/${file}`, (err, stats) => {
          const fileData = this.state.fileData || []
          fileData.push({
            name: file,
            before: stats.size, // `${Math.round(stats.size / 1000)}kb`,
            after: null,
            versions: {},
          })
          this.setState({ stats })
          this.setState({ fileData })
        })
      })
    })

    ipcRenderer.on('found-images', (e, content) => {
      console.log({ content })
      this.setState({ foundImages: content })
    })

    ipcRenderer.on('complete', () => {})

    ipcRenderer.on('version-complete', (e, content) => {
      console.log('file-complete heard', content)
      const { file, dir } = content

      this.setState(prevState => {
        fs.stat(`${this.state.folder}/${dir}/${file}`, (err, stats) => {
          console.log('reading stats', `${this.state.folder}/${dir}/${file}`, err || stats)
          if (err) throw err
          const update = prevState.fileData.map(s => {
            const output = s
            if (s.name === file) {
              output.versions[dir] = stats.size
            }
            return output
          })
          return update
        })
      })

    })

    ipcRenderer.on('status', (e, content) => {
      this.setState({
        status: content,
        showChooseFolderButton: true, // content.toLowerCase() === 'innactive',
        showProcessingButtons: content.toLowerCase() !== 'innactive' && !content.toLowerCase().includes('processing'),
        showSpinner: content.toLowerCase().includes('processing')
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

  handleClick_start () {
    ipcRenderer.send('start', {
      model: this.props.model,
      folder: this.state.folder,
      fileList: this.state.fileList,
    })
  }
  toggleReadme () {
    this.setState({ showReadme: !this.state.showReadme})
  }
  fileSize (bytes) {
    const kb = Math.round(bytes / 1000)
    if (kb >= 1000) {
      // first dived 100 and round. divide by 10 again 
      // gives accurate mb to one decimal places
      const mb = Math.round(kb / 100) / 10
      return `${mb}mb`
    }
    return `${(kb)}kb`
  }

  async componentDidMount () {
    fetch(`https://raw.githubusercontent.com/martin-banks/image-un-embiggener/master/src/image-models/${this.props.model}/README.md`)
      .then(res => res.text())
      .then(text => {
        this.setState({ readme: text })
      })
      .catch(err => {
        this.setState({ readme: '⚠️ Error loading readme file ⚠️' })
        console.error(err)
      })


  }

  render () {
    return (
      <div>
        <PageHeader>
          {
            this.state.showReadme
              ? <Markdown source={ this.state.readme } />
              : <h1>{ this.props.model }</h1>
          }
          <LogButton onClick={ this.toggleReadme }>
            { this.state.showReadme ? 'Hide' : 'Show' } details
          </LogButton>

          <pre>
            <h5>STATUS</h5>
            { this.state.status }
          </pre>
        </PageHeader>
          {
            this.state.showChooseFolderButton &&
              <button onClick={ this.handleClick_chooseFolder }>Choose Folder</button>
          }

          {
            this.state.showProcessingButtons &&
              <button
                onClick={ this.handleClick_start }
                model={ this.props.model }
              >Start</button>
          }

          { (this.state.showSpinner) &&
            <Centered>
              <Spinner />
            </Centered>
          }

          <hr />

          {
            this.state.folder
              && <>
                <p><b>Folder: </b>{ this.state.folder }</p>
                <FileInfoList>
                  <FileInfo>
                    <FileListHeader></FileListHeader>
                    <FileListHeader>Filesize</FileListHeader>
                  </FileInfo>
                  {
                    this.state.fileData
                      .map(file => (
                        <>
                          <FileInfo key={ `fileinfo-${file.name}` }>
                            <FileName>{ file.name }</FileName>
                            <FileSize>{ this.fileSize(file.before) }</FileSize>
                              {
                              Object.keys(file.versions).map(v => 
                                <>
                                  <VersionFolder>|—— { v }</VersionFolder>
                                  <FileSize color={
                                    file.before < file.versions[v]
                                      ? 'rgba(50, 0, 0, 0.5)'
                                      : 'rgba(0, 50, 0, 0.5)'
                                    }>
                                      {
                                        this.fileSize(file.versions[v])
                                        // Math.round(file.versions[v] / 1000)
                                      }
                                    </FileSize>
                                </>
                              )
                            }
                          </FileInfo>
                        </>
                      )
                    )
                  }
                </FileInfoList>
                <hr />
              </>
          }
        </div>
    )
  }
}

export default Optimiser


const ButtonWrapper = styled.div`
  display: flex;
`

const FileInfoList = styled.ul`
  padding: 0;
  margin-bottom: 2px;
`
const FileListHeader = styled.span`
  margin-bottom: 4px;
  opacity: 0.6;
`
const FileInfo = styled.li`
  display: grid;
  grid-template-columns: auto 100px;
  margin: 0;
  margin-bottom: 4px;
  list-style: none;
`
const FileInfoPart = styled.span`
  padding: 8px;
`
const FileName = styled(FileInfoPart)`
  background: rgba(0,0,0, 0.4);
  padding-left: 12px;
`
const VersionFolder = styled(FileInfoPart)`
  background: rgba(0,0,0, 0.2);
  padding-left: 24px;
  color: rgba(255,255,255, 0.5);
`
const FileSize = styled(FileInfoPart)`
  background: rgba(0,0,0, 0.4);
  background: ${p => p.color};
`

const LogButton = styled.button`
  padding: 8px 6px;
  background: none;
  color: white;
  border-radius: 0;
  text-align: left;
  border: none;
`

const Centered = styled.div`
  display: grid;
`
