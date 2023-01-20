import React from 'react'
import PropTypes from 'prop-types'
import IconsLingo from '../iconsLingo/iconsLingo'
// TODO implement SVG with loader and colors
// import SVGInline from 'react-svg-inline'

const MenuItemLingo = ({icon, name, isSelected, clickAction, hasNotification = false}) => {
  const fillSelected = isSelected ? 'var(--color-blue)' : 'var(--color-black)'
  const divSelected = isSelected
  ? { borderLeftColor: 'var(--color-blue)', borderLeftWidth: '4px', borderStyle: 'solid' }
  : { }

  const notificationIcon = hasNotification ? 'unReadNotification' : '';

  return (
    <button className='side-menu-item' style={divSelected} onClick={(e) => clickAction(e)} autoFocus={isSelected}>
      {/* <span className='side-menu-selected' style={{backgroundColor: divSelected}} /> */}
      <IconsLingo name={icon} fill={fillSelected} />
      <span style={{color: fillSelected}}>
      {name}
      </span>
      <div className={notificationIcon}></div>
    </button>
  )
}

MenuItemLingo.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  isSelected: PropTypes.bool,
  clickAction: PropTypes.func
}

export default MenuItemLingo
