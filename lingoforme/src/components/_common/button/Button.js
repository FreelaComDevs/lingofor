import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const ButtonMB = params => (
  <button
    onClick={params.clickAction || params.onClick}
    className={params.className ? params.className : 'button-mb'}
    disabled={params.disabled}
  >
    {params.icon ? params.icon : ''}
    {params.icon ? ' ' : ''}
    {!params.capitalize ? params.title : params.title}
    {params.rightIcon ? ' ' : ''}
    {params.rightIcon ? params.rightIcon : ''}
  </button>
)

ButtonMB.propTypes = {
  params: PropTypes.object,
  title: PropTypes.string,
  className: PropTypes.string,
  clickAction: PropTypes.func
}

export default ButtonMB
