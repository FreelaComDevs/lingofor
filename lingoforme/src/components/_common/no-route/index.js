import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import logo from '../../../images/logo_lingo.svg'

export default class noRoute extends Component {
  render () {
    return (
      <div className='center'>
        <div className='card'>
          <img src={logo} style={{ width: '25%', height: '25%', alignSelf: 'center', marginBottom: '10px' }} alt='logo' />
          <p className='text-center text-form'>
            { this.props.message } <br /><br />
            <Link to='/'>
              <button className='form-submit form-item'>
              Voltar para home
              </button>
            </Link>
          </p>
        </div>
      </div>
    )
  }

}
noRoute.propTypes = {
  message: PropTypes.string
}
