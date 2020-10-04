import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { actions } from '../../state'

import UI from './UI'

@connect(
  (state) => ({ ...state }),
  (dispatch) => bindActionCreators({ ...actions }, dispatch),
)
class ConnectedUI extends Component {
  render() {
    const { children, ...others } = this.props
    return <UI {...others}>{children}</UI>
  }
}
export default ConnectedUI
