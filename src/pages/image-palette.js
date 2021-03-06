import React, { Component } from 'react'
import styled from 'styled-components'
import Markdown from 'react-markdown'

import Dump from '../components/dump'
import PageHeader from '../components/page-header'

const { ipcRenderer } = window.require('electron')
const fs = window.require('fs')
const path = window.require('path')


export default class extends Component {
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
      showProcessingButtons: false,
      showChooseFolderButton: true,
      readme: null,
      showReadme: false,
      palette: {},
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
        showProcessingButtons: content.toLowerCase() !== 'innactive' && content.toLowerCase() !== 'processing',
      })
    })

    ipcRenderer.on('log', (e, content) => {
      const log = this.state.log
      log.push(content)
      this.setState({ log })
    })

    ipcRenderer.on('color-palette', (e, content) => {
      // this.setState({ palette })
      this.setState(preState => {
        return preState.palette[content.file] = content.palette
      })
      const fileName = `${content.file.replace(/\./gi, '-')}.json`
      fs.writeFile(
        path.join(this.state.folder, fileName),
        JSON.stringify(content.palette, 'utf8', 2),
        err => console.log(err || 'done')
      )
    })

  }

  handleClick_chooseFolder () {
    ipcRenderer.send('open-choose-folder')
  }

  handleClick_start () {
    ipcRenderer.send('color-palette', {
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
              >Start</button>
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
                          </FileInfo>
                          <PreviewGrid>
                              <PreviewImage src={ path.join(this.state.folder, file.name) } />
                              {
                                (this.state.palette && this.state.palette[file.name]) &&
                                  <SwatchWrapper>{
                                    Object.keys(this.state.palette[file.name])
                                      .map(key =>
                                        <Swatch color={ this.state.palette[file.name][key]._rgb }>
                                          <p>{ key }</p>
                                          <p>
                                            <span>r: { this.state.palette[file.name][key]._rgb[0] }</span>
                                            <span>g: { this.state.palette[file.name][key]._rgb[1] }</span>
                                            <span>b: { this.state.palette[file.name][key]._rgb[2] }</span>
                                          </p>
                                        </Swatch>
                                      )
                                  }</SwatchWrapper>
                              }

                          </PreviewGrid>
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
  grid-template-columns: 1fr 100px;
  margin: 0;
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

const SwatchWrapper = styled.pre`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 2px;
  margin: 0;
  color: white;
`

const Swatch = styled.div`
  padding-top: 50px;
  background: ${p => `rgb(${p.color ? p.color.join() : '0, 0, 0'})`};
  margin: 4px;
  p {
    margin: 0;
    background: rgba(0,0,0, 0.3);
    padding: 0 4px
  }
  span {
    display: block;
  }
`


const PreviewImage = styled.img`
  display: block;
  /* outline: solid 1px red; */
  max-width: 400px;
`

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  background: rgba(0,0,0, 0.6);
  margin-bottom: 4px;
`
