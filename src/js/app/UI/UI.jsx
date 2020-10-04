import electron from 'electron'
import fs from 'fs'
import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import EventListener from 'react-event-listener'

class UI extends Component {
  componentDidMount() {
    electron.ipcRenderer.on('open-file-response', this.onOpenFileResponse)
  }

  componentWillUnmount() {
    electron.ipcRenderer.off('open-file-response', this.onOpenFileResponse)

    if (this.cancelDelay) {
      this.cancelDelay()
    }
  }

  @autobind
  onOpenFileResponse(event, path) {
    console.log('onOpenFileResponse', path)
    let data = null
    try {
      data = fs.readFileSync(path[0], 'utf8')
    } catch (err) {
      console.error(err)
      return
    }
    // TODO do something with data here.
    console.log(data)
  }

  @autobind
  onResize() {
    console.log(window.innerWidth, window.innerHeight)
  }

  @autobind
  openFile() {
    electron.ipcRenderer.send('open-file-request')
  }

  render() {
    return (
      <div>
        <h1>Sample Application</h1>
        <p>Hello World!</p>
        <EventListener target="window" onResize={this.onResize} />
      </div>
    )
  }
}

UI.propTypes = {
}

export default UI
