import React from 'react'
import Background from '../../../images/bg-header.svg';

const Header = ({title, icon}) => (
  <header className="new-header" style={{backgroundImage: `url(${Background})`}}>
    <h1><img src={icon} alt={title}/>{title}</h1> 
  </header>
)

export default Header