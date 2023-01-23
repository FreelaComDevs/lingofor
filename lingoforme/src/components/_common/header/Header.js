import React from 'react'

import { Head } from './styles';

const Header = ({title, icon, children}) => {
  
  return (

    <Head>
      <header>
          <div className="header-holder">
            <div>
              <img src={"https://img.freepik.com/vetores-gratis/astronauta-bonito-dabbing-ilustracao-do-icone-dos-desenhos-animados-icone-de-ciencia-espacial-isolado-estilo-flat-cartoon_138676-3101.jpg?w=2000"}/>
            </div>
            <div className='personalData'>
              <h3>Vini</h3>
              <p>Lingua Nativa: português</p>
              <p>País: Brasil</p>
              <p>Desde: abril/2023</p>
            </div>
          </div>
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
