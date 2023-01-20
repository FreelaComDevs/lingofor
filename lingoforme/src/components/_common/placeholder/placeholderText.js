import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

class PlaceholderText extends Component {

  constructor (props) {
    super(props)

    this.i18n = this.props.i18n
    this.t = this.props.t
    
  }

  render () {
    return (
      <div align='center'>
        <h4 style={{fontSize: '24px', fontFamily: 'Quicksand', fontWeight: '500', color:'#797881',  margin: '20px'}}>{this.t('BTN_NO_CLASSES_FOUND')}</h4>
      </div>
    )
  }
}

PlaceholderText.propTypes = {
  t: PropTypes.func,
}

export default translate('translations')(PlaceholderText)

