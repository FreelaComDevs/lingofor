import React from 'react'

import { Head } from './styles';
import { AvatarArea } from '../avatar/avatar';

const Header = ({ title, icon, children }) => {

  return (

    <Head>
      <header>
        <div className="header-holder">
          <div className='container' style={{alignItems:"end"}}>
            <AvatarArea             
            name={"Vini"}
            language={"Português"}
            country={"Brasil"}
            date={"abril/2020"}
            href={"/manage-account"}
            src={"https://img.freepik.com/vetores-gratis/astronauta-bonito-dabbing-ilustracao-do-icone-dos-desenhos-animados-icone-de-ciencia-espacial-isolado-estilo-flat-cartoon_138676-3101.jpg?w=2000"}
            /> 
          </div>
        </div>
        {title === '' &&
          { children }
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
