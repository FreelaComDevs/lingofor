import React from 'react'

import { Head } from './styles';

const Header = ({title, icon, children}) => {
  
  return (

    <Head>
      <header>
          <div className="header-holder"></div>
            { title === '' &&
              {children}
            }

            {/* { title !== '' &&
            <h1>
              {icon}
              <span>{title}</span>
            </h1>
          } */}
      </header>
    </Head>

  )
}

export default Header
