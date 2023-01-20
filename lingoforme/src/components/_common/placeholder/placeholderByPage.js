import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Placeholder extends Component {
  render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: require('../../../images/placeholder/placeholder_bg.png'),
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'center'
      }}>
        <h4>{this.props.textMsg}</h4>
        <img src={require(`../../../images/placeholder/${this.props.pageName}.png`)} alt={`no-results-${this.props.pageName}`} />
      </div>
    )
  }
}

Placeholder.propTypes = {
  pageName: PropTypes.string.isRequired,
  textMsg: PropTypes.string.isRequired
}

export default Placeholder

